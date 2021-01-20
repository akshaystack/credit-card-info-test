import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CreditCardPayment } from 'src/app/form-payment/models/cc-payment.model';

@Injectable({
  providedIn: 'root',
})
export class FormPaymentService {
  // Public
  public onCreditCardInfoChanged: BehaviorSubject<{}>;

  // Private
  private creditCardInfo: CreditCardPayment;

  /**
   *
   * @param {HttpClient} _httpClient
   * @param {ToastrService} toastr
   */
  constructor(private _httpClient: HttpClient, private toastr: ToastrService) {
    this.onCreditCardInfoChanged = new BehaviorSubject({});
  }

  updateCreditCardPayment(): any {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post<CreditCardPayment>(
          'api/credit-card-Info',
          this.creditCardInfo
        )
        .subscribe(
          (response: any) => {
            console.log('Updated Info are : ', response); // Log the POST data
          },
          reject, //If rejected do nothing
          () => {
            this.toastrSuccess(); // Get Notification Toast on Successful Completion
            console.log('Completed Successfully'); // Completed log
          }
        );
    });
  }

  /**
   * Success Notification Toast
   */

  toastrSuccess() {
    this.toastr.success('Credit Card Info updated successfully! ', 'Success');
  }

  setCreditCardInfo(CCardInfo) {
    this.creditCardInfo = CCardInfo;
    this.onCreditCardInfoChanged.next(this.creditCardInfo);
    // POST request after data is updated
    this.updateCreditCardPayment();
  }
}
