const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const couponSchema = require('./coupons-schema');
const reportSchema = require('./reports-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));

const Coupon = mongoose.model('coupons', mongoose.Schema(couponSchema));

const Report = mongoose.model('reports', mongoose.Schema(reportSchema));

module.exports = {
  mongoose,
  User,
  Coupon,
  Report,
};
