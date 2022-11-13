const chalk = require('chalk');
module.exports = str => {
  let ERROR_MSG = ''
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    if (['to', 'from'].includes(str)) {
      const copyStr = str
      str = str === 'to'? 'owedTo': 'owedFrom'
      if (GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER][str]) {
        if (Object.keys(GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER][str]).length) {
          for (let eachOwed in GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER][str]) {
            console.log(chalk.blue(`Owed $${GLOBAL_USERS[GLOBAL_CURRENT_ACTIVE_USER][str][eachOwed]} ${copyStr} ${eachOwed}`));
          }
        } else {
          console.log(chalk.blue(`owed ${copyStr} no user`));
        }
      } else {
        console.log(chalk.blue(`owed ${copyStr} no user`));
      }
    } else {
      ERROR_MSG = 'invalid option'
    }
  } else {
    ERROR_MSG = 'No user logged in found'
  }
  if (ERROR_MSG) return { ERROR_MSG }
  return { success: true }
}