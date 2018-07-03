const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空。']
  },
  // TODO: either phone or email is required.
  phone: {
    type: String
  },
  email: {
    type: String
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
  last_name: String
})

userSchema.set('timestamps', true)

userSchema.pre('save', function(next) {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('user', userSchema)
