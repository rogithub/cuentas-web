import { Routes } from '@angular/router';
import { AccountList } from './features/account-list/account-list';
import { AccountForm } from './features/account-form/account-form';

export const routes: Routes = [
    { path: 'accounts/new', component: AccountForm },
    { path: 'accounts', component: AccountList },
    { path: '', redirectTo: '/accounts', pathMatch: 'full'}
];
