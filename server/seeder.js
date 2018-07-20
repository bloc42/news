import mongoose from 'mongoose'
import config from '../config'
import faker from 'faker'
import User from './entities/user/model'
import Post from './entities/post/model'
import Comment from './entities/comment/model'
import CommentAPI from './entities/comment/api'

if (!config.isLocal) {
  console.log('Do not seed database in production!')
  process.exit()
}

mongoose.connect(config.DBURL)
;(async () => {
  console.log('Removing documents...')
  await User.find()
    .remove()
    .exec()
  await Post.find()
    .remove()
    .exec()
  await Comment.find()
    .remove()
    .exec()

  console.log('Seeding users...')
  let users = []

  for (let i = 0; i < 10; i++) {
    const user = new User({
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    await user.save()
    users.push(user)
  }

  const admin = new User({
    username: 'admin',
    email: 'admin@blockdog.com',
    password: '123456',
    role: 'admin'
  })

  await admin.save()
  users.push(admin)

  console.log('Seeding posts...')
  for (let i = 0; i < 80; i++) {
    const randomUser = faker.random.arrayElement(users)
    const hasUrl = faker.random.boolean()
    const commentCount = faker.random.number(10)

    const post = new Post({
      title: faker.lorem.sentence(),
      url: hasUrl ? faker.internet.url() : '',
      content: hasUrl ? '' : faker.lorem.paragraphs(),
      author: randomUser.username,
      commentCount
    })

    await post.save()

    for (let j = 0; j < commentCount; j++) {
      const author = faker.random.arrayElement(users).username
      const content = faker.lorem.paragraphs()
      await CommentAPI.saveComment(author, content, post.id)
    }
  }

  console.log('Done seeding.')

  process.exit()
})()
