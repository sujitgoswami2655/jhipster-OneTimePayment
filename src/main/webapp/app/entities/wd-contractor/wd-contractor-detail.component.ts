import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWDContractor } from 'app/shared/model/wd-contractor.model';

@Component({
  selector: 'jhi-wd-contractor-detail',
  templateUrl: './wd-contractor-detail.component.html'
})
export class WDContractorDetailComponent implements OnInit {
  wDContractor: IWDContractor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ wDContractor }) => {
      this.wDContractor = wDContractor;
    });
  }

  previousState() {
    window.history.back();
  }
}
