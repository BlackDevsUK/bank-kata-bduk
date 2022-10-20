import { ITransaction, Transaction } from './transaction';

export interface ITransactionFactory {
    create(amount: number, balance: number): ITransaction
}

export class TransactionFactory implements ITransactionFactory {
    create(amount: number, balance: number): ITransaction {
        return new Transaction(amount, balance);
    }
}