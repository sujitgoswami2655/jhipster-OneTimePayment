import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { AccountService } from 'app/core';
import { LDAPContractorService } from './ldap-contractor.service';

@Component({
  selector: 'jhi-ldap-contractor',
  templateUrl: './ldap-contractor.component.html'
})
export class LDAPContractorComponent implements OnInit, OnDestroy {
  lDAPContractors: ILDAPContractor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected lDAPContractorService: LDAPContractorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.lDAPContractorService
      .query()
      .pipe(
        filter((res: HttpResponse<ILDAPContractor[]>) => res.ok),
        map((res: HttpResponse<ILDAPContractor[]>) => res.body)
      )
      .subscribe(
        (res: ILDAPContractor[]) => {
          this.lDAPContractors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLDAPContractors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILDAPContractor) {
    return item.id;
  }

  registerChangeInLDAPContractors() {
    this.eventSubscriber = this.eventManager.subscribe('lDAPContractorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
