const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = {
      eng: 'Email is invalid',
      kor: '이메일주소를 확인하십시오'
    };
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = {
      eng: 'Email field is required',
      kor: '이메일은 필수입니다'
    };
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = {
      eng: 'Password field is required',
      kor: '비밀번호는 필수입니다'
    };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};