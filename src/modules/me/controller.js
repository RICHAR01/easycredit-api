import User from '../../models/user'
import AccessToken from '../../models/accessToken'
import Loan from '../../models/loan'

export async function dashboard (ctx) {
  // find user loans
  const user = ctx.state.user
  const userId = user._id
  const userLoans = await Loan.find({ userId: userId })

  // order user loans
  const pendingLoans = []
  const loanHistory = []
  userLoans.forEach(loan => {
    if (loan.status === 'pending') {
      pendingLoans.push(loan)
    } else {
      loanHistory.push(loan)
    }
  });

  // return results
  const dashboard = {
    profile: {
      username: user.username
    },
    loanHistory: loanHistory,
    pendingLoans: pendingLoans
  }

  ctx.body = dashboard
}

export async function createLoan (ctx) {
  const loan = ctx.request.body;
  const user = ctx.state.user;

  // valid request
  if (!loan.amount || !loan.age || !loan.paymentsQuantity ||
      !(typeof loan.hasCreditCard === 'boolean')) {
    throw 'error: bad request';
  }

  // calculate and set values
  const termInterest = {
    3: 5,
    6: 7,
    9: 12
  };
  const total = loan.amount * (( termInterest[loan.paymentsQuantity] / 100 ) + 1)

  loan.status = 'pending'
  loan.rejectReason = ''
  loan.total = total
  loan.userId = user._id

  // create user loan
  const newLoan = await Loan.create(loan)

  ctx.body = newLoan
}
