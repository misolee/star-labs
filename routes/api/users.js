const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jsonwebtoken = require('jsonwebtoken')
const keys = require('../../config/keys')

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  let { name, email, password, language } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = { eng: 'This email is already registered', kor: '벌써 가입된 이메일입니다' };
        return res.status(400).json(errors);
      } else {
        const newUser = new User({ name, email, password, language });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = { eng: 'This user does not exist', kor: '존재하지 않는 이메일입니다' }
        return res.status(404).json(errors);
      }

      const { email, name, language } = user;

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { email, name, language };

            jsonwebtoken.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 }, // one hour
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: { eng: 'Incorrect password', kor: '이메일과 비밀번호가 일치하지 않습니다' }});
          }
        })
    })
})

module.exports = router