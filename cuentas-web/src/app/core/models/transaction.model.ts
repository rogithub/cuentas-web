export enum TransactionType {
    Income = 0,
    Expense = 1
}

export interface Transaction {
    id: number;
    accountId: number;
    amount: number;
    description: string;
    type: TransactionType;
    transactionDate: string;
}