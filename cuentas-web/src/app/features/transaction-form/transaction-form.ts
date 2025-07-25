import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../core/services/transaction';
import { Transaction, TransactionType } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm implements OnInit{
  private fb = inject(FormBuilder);
  private txnSvc = inject(TransactionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public isEditMode = signal(false);
  private accountId = signal<number>(0);
  private transactionId = signal<number | undefined>(undefined);

  transactionForm = this.fb.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: [TransactionType.Expense, Validators.required]
  });

  // para usar en la plantilla de html
  transactionType = TransactionType;

  ngOnInit(): void {

    // usamos el observable paramMap para reaccionar a los cambios en la URL
    this.route.paramMap.subscribe( params => { 
      const accountIdParam = params.get("accountId");
      const transactionIdParam = params.get("transactionId");

      if (accountIdParam) {
        this.accountId.set(+accountIdParam);        
      } else  {        
        console.error(`No se proporcionó un id de cuenta o de transacción`);
        this.router.navigate([`/accounts`]);
        return;
      }

      // this is valid for new txns
      if (!transactionIdParam) {
        this.isEditMode.set(false);
        return;
      }

      this.isEditMode.set(true);
      
      // get fixed value as a const
      const txnId = +transactionIdParam;
      this.transactionId.set(txnId);
        
      this.txnSvc.getTransactionById(txnId)
        .subscribe(
          txn => this.transactionForm.patchValue(txn)
        )
      
    });    
  }


  onSubmit(): void {
    if (!this.transactionForm.valid) return;

    const formValue = this.transactionForm.getRawValue();
    const navigateBack = () => this.router.navigate(['/accounts', this.accountId()]);

    if (this.isEditMode()) {
        const edited: Transaction = { 
          id: this.transactionId()!,
          accountId: this.accountId(),
          description: formValue.description!,
          amount: formValue.amount!,
          type: formValue.type!,
          transactionDate: new Date().toISOString()
        };
        this.txnSvc.updateTransaction(edited).subscribe(navigateBack);
    } else {
      const newTxn = { 
        accountId: this.accountId(),
        description: formValue.description!,
        amount: formValue.amount!,
        type: formValue.type!
      };
      this.txnSvc.createTransaction(newTxn).subscribe(navigateBack)
    };
  }
}
