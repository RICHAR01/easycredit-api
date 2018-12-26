import mongoose from 'mongoose'

const Loan = new mongoose.Schema({
  amount: { type: Number, required: true },
  age: { type: Number, required: true },
  hasCreditCard: { type: Boolean, required: true },
  paymentsQuantity: { type: Number, required: true },
  userId: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  rejectReason: { type: String }
})

export default mongoose.model('loan', Loan)
