const { date } = require('joi');

const couponsSchema = {
  coupons_date_expired: String,
  coupons_name: String,
  coupons_discount_percentage: Number,
  coupons_term_and_conditions: String,
};

module.exports = couponsSchema;
