import data from './data'
import User from '../src/models/user'

export async function boot () {

  if (data.users.length) {
    try {
      const user = await User.findOne();
      if (!user) {
        const newUsers = await User.create(data.users);
      }
    } catch (err) {
      throw err;
    }
  }

}
