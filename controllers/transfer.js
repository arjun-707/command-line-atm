const chalk = require('chalk');
const owed = require('./owed')
module.exports = (username, amount) => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    if (username && GLOBAL_USERS[username]) {
      if (username === GLOBAL_CURRENT_ACTIVE_USER) {
        ERROR_MSG = `can't transfer to logged in user`
      } else if (!isNaN(amount)) {
        amount = +amount
        const currentBalance = GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance
        const remainingBalance = currentBalance - amount
        if (remainingBalance < 0) {
          GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance = 0
          GLOBAL_USERS[username].balance += currentBalance
          if (GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[username]) {
            GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[username] += (amount - currentBalance)
            if (GLOBAL_USERS[username].owedFrom[GLOBAL_CURRENT_ACTIVE_USER]) {
              GLOBAL_USERS[username].owedFrom[GLOBAL_CURRENT_ACTIVE_USER] += (amount - currentBalance)
            } else {
              GLOBAL_USERS[username].owedFrom[GLOBAL_CURRENT_ACTIVE_USER] = (amount - currentBalance)
            }
          } else {
            GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[username] = (amount - currentBalance)
            GLOBAL_USERS[username].owedFrom[GLOBAL_CURRENT_ACTIVE_USER] = (amount - currentBalance)
          }
          console.log(chalk.blue(`Transferred $${currentBalance? currentBalance: amount} to ${username}`));
        } else {
          GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance = remainingBalance
          GLOBAL_USERS[username].balance += amount
          console.log(chalk.blue(`Transferred $${amount} to ${username}`));
        }
        console.log(chalk.blue(`Your balance is $${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance}`));
        owed('to')
        owed('from')
      } else {
        ERROR_MSG = 'amount required'
      }
    } else {
      ERROR_MSG = 'username not registered'
    }
  } else {
    ERROR_MSG = 'No user logged in found'
  }
  if (ERROR_MSG) return { ERROR_MSG }
  return { success: true }
}