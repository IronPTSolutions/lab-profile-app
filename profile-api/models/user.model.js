const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    campus: {
        type: String,
        required: true,
        enum: [
            'Madrid',
            'Barcelona',
            'Miami',
            'Paris',
            'Berlin',
            'Amsterdam',
            'Mexico',
            'Sao Paulo'
        ]
    },
    course: {
        type: String,
        required: true,
        enum: [
            'WebDev',
            'UX/UI',
            'Data Analytics'
        ]
    },
    avatarUrl: {
        type: String,
        match: [URL_PATTERN, 'Invalid avatar URL pattern']
    }
}, {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    })


userSchema.pre('save', function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      next();
    } else {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            })
        })
        .catch(next)
    }
  });

    userSchema.methods.checkPassword = function (password) {
        return bcrypt.compare(password, this.password);
      }

const User = mongoose.model('User', userSchema);
module.exports = User;