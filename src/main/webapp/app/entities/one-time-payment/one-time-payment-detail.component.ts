import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';

@Component({
  selector: 'jhi-one-time-payment-detail',
  templateUrl: './one-time-payment-detail.component.html'
})
export class OneTimePaymentDetailComponent implements OnInit {
  oneTimePayment: IOneTimePayment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ oneTimePayment }) => {
      this.oneTimePayment = oneTimePayment;
    });
  }

  previousState() {
    window.history.back();
  }
}
