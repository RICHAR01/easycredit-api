import mongoose from 'mongoose'

const AccessToken = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true }
})

export default mongoose.model('accessToken', AccessToken)
