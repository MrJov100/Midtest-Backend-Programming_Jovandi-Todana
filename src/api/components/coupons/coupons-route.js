const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const couponsControllers = require('./coupons-controller');
const couponsValidator = require('./coupons-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/coupons', route);

  // rute untuk mendapatkan semua kupon
  route.get('/', authenticationMiddleware, couponsControllers.getCoupons);

  route.get('/:id', authenticationMiddleware, couponsControllers.getCoupon);
  // rute untuk membuat kupon baru
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(couponsValidator.createCoupon),
    couponsControllers.createCoupon
  );

  // rute untuk memperbarui kupon
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(couponsValidator.updateCoupon),
    couponsControllers.updateCoupon
  );

  // rute untuk menghapus kupon
  route.delete(
    '/:id',
    authenticationMiddleware,
    couponsControllers.deleteCoupon
  );
};
