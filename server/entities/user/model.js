import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import is from 'is_js'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空。']
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
  invitation_code: {
    type: String
    // TODO
  },
  role: { type: String, default: 'user' }, // ['admin', 'moderator', 'user']
  first_name: String,
  last_name: String,
  //for mail active
  is_active: { type: Number, default: 0 },
  active_code: String,
  active_deadline: {
    type: Date,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
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
    // create the active_code
    const active_hash_code = await bcrypt.hash(this.username + Date.now(), salt)

    // Override the cleartext password with the hashed one
    this.password = hash
    // Save active_code
    this.active_code = active_hash_code
    next()
  } catch (err) {
    next(err)
  }
})
export default mongoose.model('user', userSchema)
