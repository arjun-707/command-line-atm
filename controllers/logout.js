const chalk = require('chalk');
module.exports = _ => {
  if (GLOBAL_CURRENT_ACTIVE_USER) {
    console.log(chalk.green(`Goodbye,${GLOBAL_CURRENT_ACTIVE_USER}!`));
    GLOBAL_CURRENT_ACTIVE_USER = null
  }
  return { success: true }
}