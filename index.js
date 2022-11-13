const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const readline = require('readline');
const { login, balance, deposit, withdraw, transfer, logout, owed } = require('./controllers')

require('./global')

clear();

console.log(
`
${chalk.yellow(
  figlet.textSync('ATM', { horizontalLayout: 'full' })
)}
${chalk.green('Following operation are available:')}
  * ${chalk.blue('login [name]')} - Logs in as this customer and creates the customer if not exist
  * ${chalk.blue('balance')} - Show current balance of the current customer 
  * ${chalk.blue('deposit [amount]')} - Deposits this amount to the logged in customer
  * ${chalk.blue('withdraw [amount]')} - Withdraws this amount from the logged in customer
  * ${chalk.blue('transfer [target] [amount]')} - Transfers this amount from the logged in customer to the target customer
  * ${chalk.blue('owed to')} - Show all owed usernames owed to logged in user
  * ${chalk.blue('owed from')} - Show all usernames wed from logged in user
  * ${chalk.blue('logout')} - Logs out of the current customer 
--------------------------------------------------------------------------------------------------------------------------------------------
Note: Always use 'login' operation to register new user, this will automatically create new user in backend
--------------------------------------------------------------------------------------------------------------------------------------------
`
);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let Result = null
rl.on('line', (line) => {
  if (line) {
    const [operation, value1, value2 = null] = line.trim().split(' ')
    // console.log('operation', operation);
    switch (operation) {
      case 'login':
        Result = login(value1)
        break;
      case 'balance':
        Result = balance()
        break;
      case 'deposit':
        Result = deposit(value1)
        break;
      case 'withdraw':
        Result = withdraw(value1)
        break;
      case 'transfer':
        Result = transfer(value1, value2)
        break;
      case 'owed':
        Result = owed(value1)
        break;
      case 'logout':
        Result = logout()
        break;
      case 'exit':
        process.exit()
      default:
        console.log(chalk.red('invalid command'))
        break;
    }
  }
  if (!Result) {
    Result = 'Invalid command'
  } else if (Result.ERROR_MSG) {
    console.log(chalk.red(Result.ERROR_MSG))
  } else {
    Result = null
  }
  return
});

rl.once('close', () => {
  if (Result) console.error(chalk.red(Result))
});
