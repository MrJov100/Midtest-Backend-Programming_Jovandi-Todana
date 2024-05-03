const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const coupons = require('./components/coupons/coupons-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  coupons(app);

  return app;
};
