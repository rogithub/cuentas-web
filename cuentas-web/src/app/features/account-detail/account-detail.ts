import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../core/services/account';
import { TransactionService } from '../../core/services/transaction';
import { Account } from '../../core/models/account.model';
import { Transaction } from '../../core/models/transaction.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css'
})
export class AccountDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private actSvc = inject(AccountService);
  private txnSvc = inject(TransactionService);
  public account = signal<Account | undefined>(undefined);
  public transactions = signal<Transaction[]>([]);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    if (!id) return;

    const accountId = +id; // el + lo convierte en numeric

    // el + convierte el id a numeric
    this.actSvc.getAccountById(accountId)
      .subscribe({
        next: (data) => {
          this.account.set(data);          
        },
        error: (err) => {
          console.error(`Error fetching account details: ${err.message}`);
          this.account.set(undefined);
        }
      });

      this.loadTransactions(accountId);
  }

  loadTransactions(accountId: number): void {
    this.txnSvc.getTransactionsForAccount(accountId)
      .subscribe({
        next: (data) => this.transactions.set(data),
        error: (err) => console.error(`Error fetching transactions: ${err.message}`)
      });
  }

  editAccount(id: number): void {
    this.router.navigate(['/accounts/edit', id]);
  }

  deleteAccount(id: number): void {
    if (!confirm(`¿Estás seguro de que quieres eliminar esta cuenta id ${id}?`))
      return;

    this.actSvc.deleteAccount(id)
      .subscribe({
        next: () => {
          console.log(`Cuenta id ${id} elmiminada exitosamente`);
          this.router.navigate(['/accounts']);
        },
        error: (err) => {
          console.error(`Error al eliminar la cuenta ${id}. ${err.message}`);
        }
      })
  }


}
