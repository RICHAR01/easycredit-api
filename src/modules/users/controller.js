import User from '../../models/user'
import AccessToken from '../../models/accessToken'

export async function login (ctx) {
  // find user
  const { username } = ctx.request.body;
  let user = null;
  user = await User.findOne({ username: username })

  // if there is not user, create user
  if (!user) {
    const newUsers = {
      username: username,
      roleId: 1
    }
    user = await User.create(newUsers)
  }

  // create accessToken
  const randomNumer = Math.floor(Math.random() * 100000000)
  const dateInteger = new Date().getTime()
  const userAccessToken = {
    token: randomNumer + dateInteger,
    userId: user._id
  }
  const accessToken = await AccessToken.create(userAccessToken)

  // return user with accessToken
  const userWithToken = {
    _id: user._id,
    username: user.username,
    roleId: user.roleId,
    accessToken: accessToken
  }

  ctx.body = userWithToken
}


export async function getUsers (ctx) {
  const users = await User.find({})
  ctx.body = users
}
