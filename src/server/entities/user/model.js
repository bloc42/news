import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import is from 'is_js'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空。'],
    index: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    require: [true, '邮箱不能为空。'],
    validate: {
      validator: v => is.email(v),
      message: '邮箱格式不正确。'
    }
  },
  password: {
    type: String,
    minlength: [6, '密码不能少于6位。']
  },
  role: { type: String, default: 'user' }, // ['admin', 'moderator', 'user']
  firstName: String,
  lastName: String,
  //for mail active
  isActivated: { type: Number, default: 0 },
  activationCode: String,
  activationDeadline: Date,
  following: Array
})

userSchema.set('timestamps', true)

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)

  if (!this.isModified('password')) return next()

  const SALT_WORK_FACTOR = 10

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

    // Hash the password using our new salt
    const hash = await bcrypt.hash(this.password, salt)

    // Override the cleartext password with the hashed one
    this.password = hash

    next()
  } catch (err) {
    next(err)
  }
})
export default mongoose.model('user', userSchema)
