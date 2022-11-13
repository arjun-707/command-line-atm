const chalk = require('chalk');
const owed = require('./owed')
module.exports = amount => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    if (!isNaN(amount)) {
      amount = +amount
      if (GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo) {
        const owedUsernames = Object.keys(GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo)
        owedUsernames.map(eachUsername => {
          const remainingAmount = amount - GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]
          if (remainingAmount >= 0) {
            GLOBAL_USERS[eachUsername].balance += GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]
            console.log(chalk.blue(`Transferred $${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]} to ${eachUsername}`));
            amount -= GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]
            delete GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]
            delete GLOBAL_USERS[eachUsername].owedFrom[GLOBAL_CURRENT_ACTIVE_USER]
          } else if (amount > 0) {
            GLOBAL_USERS[eachUsername].balance += amount
            GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername] -= amount
            GLOBAL_USERS[eachUsername].owedFrom[GLOBAL_CURRENT_ACTIVE_USER] -= amount
            console.log(chalk.blue(`Transferred $${amount} to ${eachUsername}`));
            amount -= GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].owedTo[eachUsername]
          }
        })
        if (amount > 0) {
          GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance += amount
        }
      } else {
        GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance += amount
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