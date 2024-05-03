const reportsSchema = {
  date_report: {
    type: Date,
  },
  total_sales: Number,
  total_visitors: Number,
  notes: String,
};

module.exports = reportsSchema;
