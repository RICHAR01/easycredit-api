import User from '../../models/user'
import AccessToken from '../../models/accessToken'
import Esp8266 from '../../models/esp8266'
import { log } from 'util';

export async function getAllData (ctx) {
  // find allData
  const allData = await Esp8266.find().sort({$natural:-1})
  console.log(allData);

  //return pending loans
  ctx.body = allData
}

export async function getLastData (ctx) {
  // find last data
  const approvedLoan = await Esp8266.find().sort({$natural:-1}).limit(1);

  //return last data
  ctx.body = approvedLoan
}
