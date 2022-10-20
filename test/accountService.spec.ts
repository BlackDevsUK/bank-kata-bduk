// Given a client makes a deposit of 1000 on 10-01-2012
// And a deposit of 2000 on 13-01-2012
// And a withdrawal of 500 on 14-01-2012
// When they print their bank statement
// Then they would see:
import { ITransaction, Transaction } from "../src/transaction";
import { AccountService } from "../src/accountService";
import { IPrintService, PrintService } from "../src/printService";
import { ITransactionFactory } from "../src/transactionFactory";

class MockTransactionFactory implements ITransactionFactory {
    create(amount: number, balance: number): ITransaction {
        const date = new Date(2012, 11, 10); // TODO figure out date logic
        return new Transaction(amount, balance, date);
    }
}

describe('AccountService Acceptance Test', () => {
    let transactionFactory: ITransactionFactory;
    let accountService: AccountService;
    let printService: IPrintService;

    beforeEach(() => {
        transactionFactory = new MockTransactionFactory();
        printService = new PrintService();
        accountService = new AccountService(transactionFactory, printService);
    })
    
    test("should print bank statement", () => {
        // Given a client makes a deposit of 1000 on 10-01-2012)
        accountService.deposit(1000)
        accountService.deposit(2000)
        accountService.withdraw(500)
        // And a deposit of 2000 on 13-01-2012


        // When they print their bank statement
        const logSpy = jest.spyOn(console, 'log');
        const expected = `Date       || Amount || Balance
        14/01/2012 || -500   || 2500
        13/01/2012 || 2000   || 3000
        10/01/2012 || 1000   || 1000`;

        accountService.printStatement()
        expect(logSpy).toHaveBeenCalledWith(expected);
    })
});

//let date: Date = new Date("14-01-2012");


describe('AccountService', () => {
    let transactionFactory: ITransactionFactory;
    let accountService: AccountService;
    let printService: IPrintService;

    beforeEach(() => {
        transactionFactory = new MockTransactionFactory();
        printService = new PrintService();
        accountService = new AccountService(transactionFactory, printService);
    })
    test("should be able to make deposit", () => {
        accountService.deposit(1000)

        expect(accountService.balance).toEqual(1000);
    });
    test("should throw error for negative deposit", () => {
        expect(() => {
            accountService.deposit(-1000) 
        }).toThrowError("Invalid operation");
    });

    test("should be able to make a withdrawal", () => {
        accountService = new AccountService(transactionFactory, printService, 1000)
        accountService.withdraw(1000)

        expect(accountService.balance).toEqual(0);
    });

    test("should throw an error when you try to withdrawal more than you have", () => {
        accountService = new AccountService(transactionFactory, printService, 1000)
        
        expect(() => {
            accountService.withdraw(2000) 
        }).toThrow();
    });

    test("should throw error for negative withdrawal", () => {
        expect(() => {
            accountService.withdraw(-10) 
        }).toThrow();
    });

    test("should print header", () => {
        const logSpy = jest.spyOn(console, 'log');
        const expected = 'Date       || Amount || Balance';

        accountService.printStatement();

        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test("should print log for single transaction", () => {
        accountService.deposit(1000);
        const logSpy = jest.spyOn(console, 'log');
        const expected = 'Date       || Amount || Balance';

        accountService.printStatement();

        expect(logSpy).toHaveBeenCalledWith(expected);
    });

});