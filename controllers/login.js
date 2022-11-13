const chalk = require('chalk');
const owed = require('./owed')
module.exports = username => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    ERROR_MSG = 'user already logged in'
  } else if (username) {
    GLOBAL_CURRENT_ACTIVE_USER = username
    if (!GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER]) GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER] = JSON.parse(JSON.stringify(GLOBAL_OPT))
    console.log(chalk.blue(`Hello, ${username}`));
    console.log(chalk.blue(`Your balance is $${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance}`));
    owed('to')
    owed('from')
  } else {
    ERROR_MSG = 'Username is required'
  }
  if (ERROR_MSG) return { ERROR_MSG }
  return { success: true }
}