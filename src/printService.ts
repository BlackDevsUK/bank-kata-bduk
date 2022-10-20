import { ITransaction } from "./transaction";

export interface IPrintService{
    print(column1: string, column2: string, column3: string): void;
    printTransaction(transaction: ITransaction): void;
}

export class PrintService implements IPrintService{

    constructor()
    {}

    public printTransaction(transaction: ITransaction) {
        this.print(this.formatDate(transaction.date), transaction.amount.toString(), transaction.balance.toString());
    }

    // print( 'Date', 'Amount', 'Balance')
    // print( transaction.date, transaction.amount, transaction.balance);
    public print(column1: string, column2:string, column3:string): void{
        //const header = "Date       || Amount || Balance";
        console.log(`${ column1 }       || ${ column2 } || ${ column3 }`);
    }

    private formatDate(date:Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/');
    }
}