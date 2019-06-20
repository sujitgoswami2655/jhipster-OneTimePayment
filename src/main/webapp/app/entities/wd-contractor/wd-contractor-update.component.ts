import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IWDContractor, WDContractor } from 'app/shared/model/wd-contractor.model';
import { WDContractorService } from './wd-contractor.service';

@Component({
  selector: 'jhi-wd-contractor-update',
  templateUrl: './wd-contractor-update.component.html'
})
export class WDContractorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    startDate: [],
    commissionPct: [],
    workdayNo: [],
    contractorID: []
  });

  constructor(protected wDContractorService: WDContractorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ wDContractor }) => {
      this.updateForm(wDContractor);
    });
  }

  updateForm(wDContractor: IWDContractor) {
    this.editForm.patchValue({
      id: wDContractor.id,
      firstName: wDContractor.firstName,
      lastName: wDContractor.lastName,
      email: wDContractor.email,
      phoneNumber: wDContractor.phoneNumber,
      startDate: wDContractor.startDate != null ? wDContractor.startDate.format(DATE_TIME_FORMAT) : null,
      commissionPct: wDContractor.commissionPct,
      workdayNo: wDContractor.workdayNo,
      contractorID: wDContractor.contractorID
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const wDContractor = this.createFromForm();
    if (wDContractor.id !== undefined) {
      this.subscribeToSaveResponse(this.wDContractorService.update(wDContractor));
    } else {
      this.subscribeToSaveResponse(this.wDContractorService.create(wDContractor));
    }
  }

  private createFromForm(): IWDContractor {
    const entity = {
      ...new WDContractor(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      commissionPct: this.editForm.get(['commissionPct']).value,
      workdayNo: this.editForm.get(['workdayNo']).value,
      contractorID: this.editForm.get(['contractorID']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWDContractor>>) {
    result.subscribe((res: HttpResponse<IWDContractor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
