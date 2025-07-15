import { Routes } from '@angular/router';
import { AccountList } from './features/account-list/account-list';
import { AccountForm } from './features/account-form/account-form';
import { AccountDetail } from './features/account-detail/account-detail';
import { TransactionForm } from './features/transaction-form/transaction-form';

export const routes: Routes = [
    { path: 'accounts/new', component: AccountForm },
    { path: 'accounts/edit/:id', component: AccountForm },

    { path: 'accounts/:accountId/transactions/new', component: TransactionForm },
    { path: 'accounts/:accountId/transactions/edit/:transactionId', component: TransactionForm },

    { path: 'accounts/:id', component: AccountDetail },
    { path: 'accounts', component: AccountList },
    { path: '', redirectTo: '/accounts', pathMatch: 'full'}
];
