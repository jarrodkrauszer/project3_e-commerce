const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val)
      },
      message() {
        return 'You must enter a valid email address.'
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters in length.']
  },
  orders: [Order.schema]
}, {
  timestamps: true,
  methods: {
    async validatePass(formPassword) {
      const is_valid = await compare(formPassword, this.password);

      return is_valid;
    }
  },
  toJSON: {
    transform(_, user) {
      delete user.__v;
      delete user.password;
      return user;
    }
  }
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }

  next();
});

const User = model('User', userSchema);

module.exports = User;