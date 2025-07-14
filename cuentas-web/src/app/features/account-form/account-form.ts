import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../core/services/account';
import { Account } from '../../core/models/account.model';

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
  private route = inject(ActivatedRoute);

  public isEditMode = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.isEditMode.set(true);
    this.acctSvc.getAccountById(+id).subscribe( acc => {
      this.accountForm.patchValue(acc);
    });
  }

  accountForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit(): void {
    if (!this.accountForm.valid)
      return;
    
    const acc = this.accountForm.getRawValue() as Account;
    const navigate = () => this.router.navigate(["/accounts"]);

    this.isEditMode() ? 
      this.acctSvc.updateAccount(acc).subscribe(navigate) :
      this.acctSvc.createAccount(acc).subscribe(navigate) ;    
  }
}
