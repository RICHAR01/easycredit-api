import User from '../../models/user'
import AccessToken from '../../models/accessToken'
import Loan from '../../models/loan'

export async function getPendingLoans (ctx) {
  // find pending loans
  const query = {
    status: 'pending'
  }
  const pendingLoans = await Loan.find(query)

  // find users of loans
  const userIds = []
  pendingLoans.forEach(loan => {
    userIds.push(loan.userId)
  })
  const users = await User.find({ _id: { $in: userIds } })

  // set users of loans
  pendingLoans.forEach(loan => {
    const loanUser = users.find(user => user.id === loan.userId)
    loan._doc.user = loanUser;
  })

  //return pending loans
  ctx.body = pendingLoans
}

export async function approveLoan (ctx) {
  // find and update loan
  const loanId = ctx.params.loanId
  const query = {
    _id: loanId
  }
  const update = {
    status: 'approved'
  }
  const approvedLoan = await Loan.findOneAndUpdate(query, update)

  //return approved loan
  ctx.body = approvedLoan
}

export async function rejectLoan (ctx) {
  // find and update loan
  const loanId = ctx.params.loanId
  const rejectReason = ctx.request.body.rejectReason
  const query = {
    _id: loanId
  }
  const update = {
    status: 'rejected',
    rejectReason: rejectReason
  }
  const rejectedLoan = await Loan.findOneAndUpdate(query, update)

  //return rejected loan
  ctx.body = rejectedLoan
}
