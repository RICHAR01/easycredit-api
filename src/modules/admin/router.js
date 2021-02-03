import * as admin from './controller'

export const baseUrl = '/admin'

export default [
  {
    method: 'GET',
    route: '/esp/data',
    action: admin.getAllData
  },
  {
    method: 'GET',
    route: '/esp/last',
    action: admin.getLastData
  }
]
