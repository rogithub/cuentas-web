import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from '../../core/services/account';
import { Account } from '../../core/models/account.model';


@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css'
})
export class AccountList implements OnInit {
  public accounts = signal<Account[]>([]);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService.getAccounts()
      .subscribe({
        next: (data: Account[]) => {
          this.accounts.set(data);
        },
        error: (err) => {
          console.error(`Error fetching accounts ${err.message}`);
        }
      })

  }
}
