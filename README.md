# ATM

### Prerequisite
  * Node.Js
### Following operation are available:
  * ```login [name]``` - Logs in as this customer and creates the customer if not exist
  * ```balance``` - Show current balance of the current customer 
  * ```deposit [amount]``` - Deposits this amount to the logged in customer
  * ```withdraw [amount]``` - Withdraws this amount from the logged in customer
  * ```transfer [target] [amount]``` - Transfers this amount from the logged in customer to the target customer
  * ```owed to``` - Show all usernames owed to logged in user
  * ```owed from``` - Show all usernames owed from logged in user
  * ```logout``` - Logs out of the current customer 
--------------------------------------------------------------------------------------------------------------------------------------------
##### Note: Always use 'login' operation to register new user, this will automatically create new user in backend
--------------------------------------------------------------------------------------------------------------------------------------------
