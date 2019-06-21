import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';
import { AccountService } from 'app/core';
import { DueOneTimePaymentService } from './due-one-time-payment.service';

@Component({
  selector: 'jhi-due-one-time-payment',
  templateUrl: './due-one-time-payment.component.html'
})
export class DueOneTimePaymentComponent implements OnInit, OnDestroy {
  dueOneTimePayments: IDueOneTimePayment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dueOneTimePaymentService: DueOneTimePaymentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dueOneTimePaymentService
      .query()
      .pipe(
        filter((res: HttpResponse<IDueOneTimePayment[]>) => res.ok),
        map((res: HttpResponse<IDueOneTimePayment[]>) => res.body)
      )
      .subscribe(
        (res: IDueOneTimePayment[]) => {
          this.dueOneTimePayments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDueOneTimePayments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDueOneTimePayment) {
    return item.id;
  }

  registerChangeInDueOneTimePayments() {
    this.eventSubscriber = this.eventManager.subscribe('dueOneTimePaymentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
