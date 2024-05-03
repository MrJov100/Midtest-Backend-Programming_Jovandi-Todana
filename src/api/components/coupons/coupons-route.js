const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const couponsControllers = require('./coupons-controller');
const couponsValidator = require('./coupons-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/coupons', route);

  // Definisikan rute untuk mendapatkan semua kupon
  route.get('/', authenticationMiddleware, couponsControllers.getCoupons);

  route.get('/:id', authenticationMiddleware, couponsControllers.getCoupon);
  // Definisikan rute untuk membuat kupon baru
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(couponsValidator.createCoupon),
    couponsControllers.createCoupon
  );

  // Definisikan rute untuk memperbarui kupon
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(couponsValidator.updateCoupon),
    couponsControllers.updateCoupon
  );

  // Definisikan rute untuk menghapus kupon
  route.delete(
    '/:id',
    authenticationMiddleware,
    couponsControllers.deleteCoupon
  );
};
