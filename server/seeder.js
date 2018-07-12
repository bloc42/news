import faker from 'faker'
import User from './entities/user/model'
import Post from './entities/post/model'
;(async () => {
  console.log('Removing documents...')
  await User.find()
    .remove()
    .exec()
  await Post.find()
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

  console.log('Seeding posts...')
  for (let i = 0; i < 80; i++) {
    const randomUser = faker.random.arrayElement(users)
    const hasUrl = faker.random.boolean()

    const post = new Post({
      title: faker.lorem.sentence(),
      url: hasUrl ? faker.internet.url() : '',
      content: hasUrl ? '' : faker.lorem.paragraphs(),
      author: randomUser.username,
      commentCount: faker.random.number(300)
    })

    await post.save()
  }

  console.log('Done seeding.')
})()
