import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WDContractor } from 'app/shared/model/wd-contractor.model';
import { WDContractorService } from './wd-contractor.service';
import { WDContractorComponent } from './wd-contractor.component';
import { WDContractorDetailComponent } from './wd-contractor-detail.component';
import { WDContractorUpdateComponent } from './wd-contractor-update.component';
import { WDContractorDeletePopupComponent } from './wd-contractor-delete-dialog.component';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';

@Injectable({ providedIn: 'root' })
export class WDContractorResolve implements Resolve<IWDContractor> {
  constructor(private service: WDContractorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWDContractor> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<WDContractor>) => response.ok),
        map((wDContractor: HttpResponse<WDContractor>) => wDContractor.body)
      );
    }
    return of(new WDContractor());
  }
}

export const wDContractorRoute: Routes = [
  {
    path: '',
    component: WDContractorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.wDContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WDContractorDetailComponent,
    resolve: {
      wDContractor: WDContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.wDContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WDContractorUpdateComponent,
    resolve: {
      wDContractor: WDContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.wDContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WDContractorUpdateComponent,
    resolve: {
      wDContractor: WDContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.wDContractor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const wDContractorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WDContractorDeletePopupComponent,
    resolve: {
      wDContractor: WDContractorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.wDContractor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
