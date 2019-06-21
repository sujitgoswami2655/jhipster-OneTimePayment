import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDueOneTimePayment, DueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';
import { DueOneTimePaymentService } from './due-one-time-payment.service';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { WDContractorService } from 'app/entities/wd-contractor';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { LDAPContractorService } from 'app/entities/ldap-contractor';

@Component({
  selector: 'jhi-due-one-time-payment-update',
  templateUrl: './due-one-time-payment-update.component.html'
})
export class DueOneTimePaymentUpdateComponent implements OnInit {
  isSaving: boolean;

  wdcontractors: IWDContractor[];

  ldapcontractors: ILDAPContractor[];

  editForm = this.fb.group({
    id: [],
    amount: [],
    paymentDueDate: [],
    contractorID: [],
    contractorID: [],
    contractorID: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dueOneTimePaymentService: DueOneTimePaymentService,
    protected wDContractorService: WDContractorService,
    protected lDAPContractorService: LDAPContractorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dueOneTimePayment }) => {
      this.updateForm(dueOneTimePayment);
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

  updateForm(dueOneTimePayment: IDueOneTimePayment) {
    this.editForm.patchValue({
      id: dueOneTimePayment.id,
      amount: dueOneTimePayment.amount,
      paymentDueDate: dueOneTimePayment.paymentDueDate != null ? dueOneTimePayment.paymentDueDate.format(DATE_TIME_FORMAT) : null,
      contractorID: dueOneTimePayment.contractorID,
      contractorID: dueOneTimePayment.contractorID,
      contractorID: dueOneTimePayment.contractorID
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dueOneTimePayment = this.createFromForm();
    if (dueOneTimePayment.id !== undefined) {
      this.subscribeToSaveResponse(this.dueOneTimePaymentService.update(dueOneTimePayment));
    } else {
      this.subscribeToSaveResponse(this.dueOneTimePaymentService.create(dueOneTimePayment));
    }
  }

  private createFromForm(): IDueOneTimePayment {
    return {
      ...new DueOneTimePayment(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      paymentDueDate:
        this.editForm.get(['paymentDueDate']).value != null
          ? moment(this.editForm.get(['paymentDueDate']).value, DATE_TIME_FORMAT)
          : undefined,
      contractorID: this.editForm.get(['contractorID']).value,
      contractorID: this.editForm.get(['contractorID']).value,
      contractorID: this.editForm.get(['contractorID']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDueOneTimePayment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
