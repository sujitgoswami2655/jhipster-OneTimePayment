import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ILDAPContractor, LDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { LDAPContractorService } from './ldap-contractor.service';

@Component({
  selector: 'jhi-ldap-contractor-update',
  templateUrl: './ldap-contractor-update.component.html'
})
export class LDAPContractorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    startDate: [],
    commissionPct: [],
    contractorID: []
  });

  constructor(protected lDAPContractorService: LDAPContractorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ lDAPContractor }) => {
      this.updateForm(lDAPContractor);
    });
  }

  updateForm(lDAPContractor: ILDAPContractor) {
    this.editForm.patchValue({
      id: lDAPContractor.id,
      firstName: lDAPContractor.firstName,
      lastName: lDAPContractor.lastName,
      email: lDAPContractor.email,
      phoneNumber: lDAPContractor.phoneNumber,
      startDate: lDAPContractor.startDate != null ? lDAPContractor.startDate.format(DATE_TIME_FORMAT) : null,
      commissionPct: lDAPContractor.commissionPct,
      contractorID: lDAPContractor.contractorID
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const lDAPContractor = this.createFromForm();
    if (lDAPContractor.id !== undefined) {
      this.subscribeToSaveResponse(this.lDAPContractorService.update(lDAPContractor));
    } else {
      this.subscribeToSaveResponse(this.lDAPContractorService.create(lDAPContractor));
    }
  }

  private createFromForm(): ILDAPContractor {
    return {
      ...new LDAPContractor(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      commissionPct: this.editForm.get(['commissionPct']).value,
      contractorID: this.editForm.get(['contractorID']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILDAPContractor>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
