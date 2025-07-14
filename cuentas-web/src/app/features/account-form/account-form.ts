import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/account';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.html',
  styleUrl: './account-form.css'
})
export class AccountForm {
  private fb = inject(FormBuilder);
  private acctSvc = inject(AccountService);
  private router = inject(Router);

  accountForm = this.fb.group({
    name: ['', Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.acctSvc.createAccount(this.accountForm.value as any)
        .subscribe(()=> {
          this.router.navigate(["/accounts"]);
        });
    }
  }
}
