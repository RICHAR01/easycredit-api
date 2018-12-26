import * as me from './controller'

export const baseUrl = '/me'

export default [
  {
    method: 'GET',
    route: '/dashboard',
    action: me.dashboard
  },
  {
    method: 'POST',
    route: '/loans',
    action: me.createLoan
  }
]
