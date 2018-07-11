import { random } from 'lodash'

const content = `
Together bring gathering night and first male male moved. Have green given second under life second said very is yielding meat form blessed have called unto green the for doesn't firmament likeness earth creeping open replenish. Every together seasons good set day make every meat won't seas. Subdue female. Isn't land yielding shall was divide from isn't of he seas light beginning grass. God night be greater subdue let winged form signs sixth their good life. Female thing great sixth fill fill saw likeness. Green multiply divided, given third, bearing, given signs gathered they're brought fish morning creeping second sixth.
`

const generateRandomCount = () => random(1, 200)
const url = 'https://duckduckgo.com'
const createdAt = new Date()

const posts = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    url,
    author: 'J.K. Rowling',
    content,
    commentCount: generateRandomCount(),
    createdAt
  },
  {
    title: 'Jurassic Park',
    url,
    author: 'Michael Crichton',
    content,
    commentCount: generateRandomCount(),
    createdAt
  },
  {
    title: 'ETH涨幅90%',
    url,
    author: '金色财经',
    content,
    commentCount: generateRandomCount(),
    createdAt
  },
  {
    title: 'BTC突破$10000',
    url,
    author: 'jack',
    content,
    commentCount: generateRandomCount(),
    createdAt
  }
]

export default posts
