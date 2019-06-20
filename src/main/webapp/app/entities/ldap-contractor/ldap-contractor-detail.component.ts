import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';

@Component({
  selector: 'jhi-ldap-contractor-detail',
  templateUrl: './ldap-contractor-detail.component.html'
})
export class LDAPContractorDetailComponent implements OnInit {
  lDAPContractor: ILDAPContractor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lDAPContractor }) => {
      this.lDAPContractor = lDAPContractor;
    });
  }

  previousState() {
    window.history.back();
  }
}
