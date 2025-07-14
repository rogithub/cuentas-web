import { Routes } from '@angular/router';
import { AccountList } from './features/account-list/account-list';

export const routes: Routes = [
    { path: 'accounts', component: AccountList },
    { path: '', redirectTo: '/accounts', pathMatch: 'full'}
];
