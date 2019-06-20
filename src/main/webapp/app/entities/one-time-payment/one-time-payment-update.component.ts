import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOneTimePayment, OneTimePayment } from 'app/shared/model/one-time-payment.model';
import { OneTimePaymentService } from './one-time-payment.service';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { WDContractorService } from 'app/entities/wd-contractor';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { LDAPContractorService } from 'app/entities/ldap-contractor';

@Component({
  selector: 'jhi-one-time-payment-update',
  templateUrl: './one-time-payment-update.component.html'
})
export class OneTimePaymentUpdateComponent implements OnInit {
  isSaving: boolean;

  wdcontractors: IWDContractor[];

  ldapcontractors: ILDAPContractor[];

  editForm = this.fb.group({
    id: [],
    amount: [],
    paymentDue: [],
    contractorID: [],
    wDContractor: [],
    lDAPContractor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected oneTimePaymentService: OneTimePaymentService,
    protected wDContractorService: WDContractorService,
    protected lDAPContractorService: LDAPContractorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ oneTimePayment }) => {
      this.updateForm(oneTimePayment);
    });
    this.wDContractorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWDContractor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWDContractor[]>) => response.body)
      )
      .subscribe((res: IWDContractor[]) => (this.wdcontractors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.lDAPContractorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILDAPContractor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILDAPContractor[]>) => response.body)
      )
      .subscribe((res: ILDAPContractor[]) => (this.ldapcontractors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(oneTimePayment: IOneTimePayment) {
    this.editForm.patchValue({
      id: oneTimePayment.id,
      amount: oneTimePayment.amount,
      paymentDue: oneTimePayment.paymentDue != null ? oneTimePayment.paymentDue.format(DATE_TIME_FORMAT) : null,
      contractorID: oneTimePayment.contractorID,
      wDContractor: oneTimePayment.wDContractor,
      lDAPContractor: oneTimePayment.lDAPContractor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const oneTimePayment = this.createFromForm();
    if (oneTimePayment.id !== undefined) {
      this.subscribeToSaveResponse(this.oneTimePaymentService.update(oneTimePayment));
    } else {
      this.subscribeToSaveResponse(this.oneTimePaymentService.create(oneTimePayment));
    }
  }

  private createFromForm(): IOneTimePayment {
    const entity = {
      ...new OneTimePayment(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      paymentDue:
        this.editForm.get(['paymentDue']).value != null ? moment(this.editForm.get(['paymentDue']).value, DATE_TIME_FORMAT) : undefined,
      contractorID: this.editForm.get(['contractorID']).value,
      wDContractor: this.editForm.get(['wDContractor']).value,
      lDAPContractor: this.editForm.get(['lDAPContractor']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOneTimePayment>>) {
    result.subscribe((res: HttpResponse<IOneTimePayment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackWDContractorById(index: number, item: IWDContractor) {
    return item.id;
  }

  trackLDAPContractorById(index: number, item: ILDAPContractor) {
    return item.id;
  }
}
