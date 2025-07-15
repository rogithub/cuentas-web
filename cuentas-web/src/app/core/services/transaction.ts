import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrl}/transactions`;
  private accountsApiUrl = `${environment.apiUrl}/accounts`;

  getTransactionsForAccount(accountId: number): Observable<Transaction[]> {    
    const url = `${this.accountsApiUrl}/${accountId}/transactions`;
    return this.http.get<Transaction[]>(url);
  }

  getTransactionById(id: number): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transaction[]>(url);
  }

  createTransaction(transaction: Omit<Transaction, 'id' | 'transactionDate'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  updateTransaction(transaction: Transaction): Observable<void> {
    const url = `${this.apiUrl}/${transaction.id}`;
    return this.http.put<void>(url, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
