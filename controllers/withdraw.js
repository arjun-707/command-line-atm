const chalk = require('chalk');
const owed = require('./owed')
module.exports = amount => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    if (!isNaN(amount)) {
      amount = +amount
      if (GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance - amount < 0) {
        console.log(chalk.blue(`$${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance - amount} withdrawn`))
        GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance = 0
      } else {
        GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance -= amount
        console.log(chalk.blue(`$${amount} withdrawn`))
      }
      console.log(chalk.blue(`Your balance is $${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance}`));
      owed('to')
      owed('from')
    } else {
      ERROR_MSG = 'amount required'
    }
  } else {
    ERROR_MSG = 'No user logged in found'
  }
  if (ERROR_MSG) return { ERROR_MSG }
  return { success: true }
}