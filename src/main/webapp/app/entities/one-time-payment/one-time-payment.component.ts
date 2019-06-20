import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';
import { AccountService } from 'app/core';
import { OneTimePaymentService } from './one-time-payment.service';

@Component({
  selector: 'jhi-one-time-payment',
  templateUrl: './one-time-payment.component.html'
})
export class OneTimePaymentComponent implements OnInit, OnDestroy {
  oneTimePayments: IOneTimePayment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected oneTimePaymentService: OneTimePaymentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.oneTimePaymentService
      .query()
      .pipe(
        filter((res: HttpResponse<IOneTimePayment[]>) => res.ok),
        map((res: HttpResponse<IOneTimePayment[]>) => res.body)
      )
      .subscribe(
        (res: IOneTimePayment[]) => {
          this.oneTimePayments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOneTimePayments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOneTimePayment) {
    return item.id;
  }

  registerChangeInOneTimePayments() {
    this.eventSubscriber = this.eventManager.subscribe('oneTimePaymentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
