import User from '../models/user'
import AccessToken from '../models/accessToken'

export async function ensureUser (ctx, next) {
  // get accessToken
  const token = ctx.header.authorization
  if (!token) return next()

  // find token model
  const accessToken = await AccessToken.findOne({ token: token })
  if (!accessToken) return next()

  // find user
  const user = await User.findById(accessToken.userId)
  if (!user) return next()

  ctx.state.user = user

  return next()
}
