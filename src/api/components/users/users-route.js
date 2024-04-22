const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', authenticationMiddleware, usersControllers.getUsers);

  // Mengambil user sesuai halaman
  route.get(
    '/page_number=:page_number',
    authenticationMiddleware,
    usersControllers.getUsers
  );

  // Mengambil data yang dimunculkan per halaman
  route.get(
    '/page_size=:page_size',
    authenticationMiddleware,
    usersControllers.getUsers
  );

  // Mengambil data yang dimunculkan per halaman dengan opsi pengurutan
  route.get(
    '/:field_name/:sort_order',
    authenticationMiddleware,
    usersControllers.getUsers
  );

  // Mengambil data user dengan email atau name, dan search key untuk mencari kata kunci
  route.get(
    '/:field_name/:search_key',
    authenticationMiddleware,
    usersControllers.getUsers
  );

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get('/:id', authenticationMiddleware, usersControllers.getUser);

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  route.delete('/:id', authenticationMiddleware, usersControllers.deleteUser);

  // Change password
  route.post(
    '/:id/change-password',
    authenticationMiddleware,
    celebrate(usersValidator.changePassword),
    usersControllers.changePassword
  );
};
