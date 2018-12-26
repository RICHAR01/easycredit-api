import * as user from './controller'

export const baseUrl = '/users'

export default [
  {
    method: 'POST',
    route: '/login',
    action: user.login
  },
  {
    method: 'GET',
    route: '/',
    action: user.getUsers
  }
]
