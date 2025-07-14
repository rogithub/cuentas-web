import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../core/services/account';
import { Account } from '../../core/models/account.model';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css'
})
export class AccountDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private actSvc = inject(AccountService);
  public account = signal<Account | undefined>(undefined);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    if (!id) return;

    // el + convierte el id a numeric
    this.actSvc.getAccountById(+id)
      .subscribe({
        next: (data) => {
          this.account.set(data);          
        },
        error: (err) => {
          console.error(`Error fetching account details: ${err.message}`);
          this.account.set(undefined);
        }
      });
  }

}
