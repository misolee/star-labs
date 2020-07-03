const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.name, {
      min: 2,
      max: 30
    })) {
    errors.name = { 
      eng: 'Name must be between 2 and 30 characters',
      kor: '성함은 2-30자여야 합니다'
    };
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = {
      eng: 'Name field is required',
      kor: '성함은 필수입니다'
    };
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = {
      eng: 'Email field is required',
      kor: '이메일은 필수입니다'
    };
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = {
      eng: 'Email is invalid',
      kor: '이메일주소를 확인하십시오'
    };
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = {
      eng: 'Password field is required',
      kor: '비밀번호는 필수입니다'
    };
  }

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 12
    })) {
    errors.password = {
      eng: 'Password must be between 6 and 12 characters',
      kor: '비밀번호는 6-12자여야 합니다'
    };
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = {
      eng: 'Confirm Password field is required',
      kor: '비밀번호 확인은 필수입니다'
    };
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = {
      eng: 'Passwords must match',
      kor: '비밀번호는 일치하여야 합니다'
    };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};