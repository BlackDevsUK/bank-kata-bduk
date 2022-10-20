import { ITransaction } from "./transaction";
import { IPrintService } from "./printService";
import { ITransactionFactory } from "./transactionFactory";

// Date       || Amount || Balance
// 14/01/2012 || -500   || 2500
// 13/01/2012 || 2000   || 3000
// 10/01/2012 || 1000   || 1000
export interface IAccountService {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  printStatement(): void
}

export class AccountService implements IAccountService {
  // internal balance
  public balance: number;
  private transactions: ITransaction[] = [];
    private transactionFactory: ITransactionFactory;
    private printService: IPrintService;

  constructor(transactionFactory: ITransactionFactory, printService: IPrintService, startingBalance = 0) {
      this.balance = startingBalance;
      this.transactionFactory = transactionFactory;
      this.printService = printService
  }


  deposit(amount: number): void {
      if (amount <= 0) {
          throw new Error("Invalid operation");
      }
      this.balance += amount;
      this.recordTransaction(amount);
  }

  withdraw(amount: number): void {
      if (amount <= 0) throw new Error("Invalid operation");
      if (amount > this.balance) throw new Error("Invalid operation");
      
      this.balance -= amount;
      this.recordTransaction(amount)
  }

  printStatement(): void {
      //const header = "Date       || Amount || Balance";
      // TODO: print log entries
      this.printService.print('Date', 'Amount', 'Balance');
      this.transactions.forEach((transaction) => {
        this.printService.printTransaction(transaction);//ToDo: Iterate from Back to Front
      })
  }

  private recordTransaction(amount: number) {
      this.transactions.push(this.transactionFactory.create(amount, this.balance));
  }

}