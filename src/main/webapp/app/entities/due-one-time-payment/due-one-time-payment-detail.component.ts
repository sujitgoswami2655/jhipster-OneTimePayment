import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

@Component({
  selector: 'jhi-due-one-time-payment-detail',
  templateUrl: './due-one-time-payment-detail.component.html'
})
export class DueOneTimePaymentDetailComponent implements OnInit {
  dueOneTimePayment: IDueOneTimePayment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dueOneTimePayment }) => {
      this.dueOneTimePayment = dueOneTimePayment;
    });
  }

  previousState() {
    window.history.back();
  }
}
