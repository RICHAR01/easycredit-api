import * as admin from './controller'

export const baseUrl = '/admin'

export default [
  {
    method: 'GET',
    route: '/loans/pending',
    action: admin.getPendingLoans
  },
  {
    method: 'POST',
    route: '/loans/:loanId/approve',
    action: admin.approveLoan
  },
  {
    method: 'POST',
    route: '/loans/:loanId/reject',
    action: admin.rejectLoan
  }
]
