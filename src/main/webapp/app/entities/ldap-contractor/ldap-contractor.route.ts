import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { LDAPContractorService } from './ldap-contractor.service';
import { LDAPContractorComponent } from './ldap-contractor.component';
import { LDAPContractorDetailComponent } from './ldap-contractor-detail.component';
import { LDAPContractorUpdateComponent } from './ldap-contractor-update.component';
import { LDAPContractorDeletePopupComponent } from './ldap-contractor-delete-dialog.component';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';

@Injectable({ providedIn: 'root' })
export class LDAPContractorResolve implements Resolve<ILDAPContractor> {
  constructor(private service: LDAPContractorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILDAPContractor> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LDAPContractor>) => response.ok),
        map((lDAPContractor: HttpResponse<LDAPContractor>) => lDAPContractor.body)
      );
    }
    return of(new LDAPContractor());
  }
}

export const lDAPContractorRoute: Routes = [
  {
    path: '',
    component: LDAPContractorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.lDAPContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LDAPContractorDetailComponent,
    resolve: {
      lDAPContractor: LDAPContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.lDAPContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LDAPContractorUpdateComponent,
    resolve: {
      lDAPContractor: LDAPContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.lDAPContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LDAPContractorUpdateComponent,
    resolve: {
      lDAPContractor: LDAPContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.lDAPContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const lDAPContractorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LDAPContractorDeletePopupComponent,
    resolve: {
      lDAPContractor: LDAPContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.lDAPContractor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
