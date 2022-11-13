const chalk = require('chalk');
module.exports = () => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    console.log(chalk.greenBright(`$${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER].balance}`));
  } else {
    ERROR_MSG = 'No user logged in found'
  }
  if (ERROR_MSG) return { ERROR_MSG }
  return { success: true }
}