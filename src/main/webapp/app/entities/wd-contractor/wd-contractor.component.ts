import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { AccountService } from 'app/core';
import { WDContractorService } from './wd-contractor.service';

@Component({
  selector: 'jhi-wd-contractor',
  templateUrl: './wd-contractor.component.html'
})
export class WDContractorComponent implements OnInit, OnDestroy {
  wDContractors: IWDContractor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected wDContractorService: WDContractorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.wDContractorService
      .query()
      .pipe(
        filter((res: HttpResponse<IWDContractor[]>) => res.ok),
        map((res: HttpResponse<IWDContractor[]>) => res.body)
      )
      .subscribe(
        (res: IWDContractor[]) => {
          this.wDContractors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInWDContractors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IWDContractor) {
    return item.id;
  }

  registerChangeInWDContractors() {
    this.eventSubscriber = this.eventManager.subscribe('wDContractorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
