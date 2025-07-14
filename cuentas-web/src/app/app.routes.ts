import { Routes } from '@angular/router';
import { AccountList } from './features/account-list/account-list';
import { AccountForm } from './features/account-form/account-form';
import { AccountDetail } from './features/account-detail/account-detail';

export const routes: Routes = [
    { path: 'accounts/new', component: AccountForm },
    { path: 'accounts/:id', component: AccountDetail },
    { path: 'accounts', component: AccountList },
    { path: '', redirectTo: '/accounts', pathMatch: 'full'}
];
