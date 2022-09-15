// Given a client makes a deposit of 1000 on 10-01-2012
// And a deposit of 2000 on 13-01-2012
// And a withdrawal of 500 on 14-01-2012
// When they print their bank statement
// Then they would see:

// Date       || Amount || Balance
// 14/01/2012 || -500   || 2500
// 13/01/2012 || 2000   || 3000
// 10/01/2012 || 1000   || 1000
interface IAccountService {
    deposit(amount: number): void;
    withdraw(amount: number): void;
    printStatement(): void
}

class AccountService implements IAccountService {
    // internal balance
    public balance: number;

    constructor(startingBalance: number = 0) {
        this.balance = startingBalance;
    }


    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Invalid operation");
        }
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount <= 0) throw new Error("Invalid operation");
        if (amount > this.balance) throw new Error("Invalid operation");
        
        this.balance -= amount;
    }

    printStatement(): void {
        const header = "Date       || Amount || Balance";
        console.log(header);
    }

}


describe('AccountService Acceptance Test', () => {
    test("should print bank statement", () => {
        // Given a client makes a deposit of 1000 on 10-01-2012
        const accountService = new AccountService()
        accountService.deposit(1000)
        accountService.deposit(2000)
        accountService.withdraw(500)
        // And a deposit of 2000 on 13-01-2012


        // When they print their bank statement
        const expected = `Date       || Amount || Balance
        14/01/2012 || -500   || 2500
        13/01/2012 || 2000   || 3000
        10/01/2012 || 1000   || 1000`;

        expect(accountService.printStatement()).toEqual(expected);
    })
});

//let date: Date = new Date("14-01-2012");


describe('AccountService', () => {
    test("should be able to make deposit", () => {
        const accountService = new AccountService()
        accountService.deposit(1000)

        expect(accountService.balance).toEqual(1000);
    });
    test("should throw error for negative deposit", () => {
        const accountService = new AccountService()

        expect(() => {
            accountService.deposit(-1000) 
        }).toThrowError("Invalid operation");
    });

    test("should be able to make a withdrawal", () => {
        const accountService = new AccountService(1000)
        accountService.withdraw(1000)

        expect(accountService.balance).toEqual(0);
    });

    test("should throw an error when you try to withdrawal more than you have", () => {
        const accountService = new AccountService(1000)
        
        expect(() => {
            accountService.withdraw(2000) 
        }).toThrow();
    });

    test("should throw error for negative withdrawal", () => {
        const accountService = new AccountService()

        expect(() => {
            accountService.withdraw(-10) 
        }).toThrow();
    });

    test("should print header", () => {
        const accountService = new AccountService()
        const logSpy = jest.spyOn(console, 'log');
        const expected = 'Date       || Amount || Balance';

        accountService.printStatement();

        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test("should print log for single transaction", () => {
        const accountService = new AccountService()
        accountService.deposit(1000);
        const logSpy = jest.spyOn(console, 'log');
        const expected = 'Date       || Amount || Balance';

        accountService.printStatement();

        expect(logSpy).toHaveBeenCalledWith(expected);
    });

});