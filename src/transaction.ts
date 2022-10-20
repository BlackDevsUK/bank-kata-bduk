export interface ITransaction {
  date: Date;
  amount: number;
  balance: number;
}

export class Transaction implements ITransaction {
  public date: Date;
  public amount: number;
  public balance: number;
  
  constructor(amount: number, balance: number, date: Date = new Date()) {
      this.date = date;
      this.amount = amount;
      this.balance = balance
  }
}
