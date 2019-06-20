import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OneTimePayment } from 'app/shared/model/one-time-payment.model';
import { OneTimePaymentService } from './one-time-payment.service';
import { OneTimePaymentComponent } from './one-time-payment.component';
import { OneTimePaymentDetailComponent } from './one-time-payment-detail.component';
import { OneTimePaymentUpdateComponent } from './one-time-payment-update.component';
import { OneTimePaymentDeletePopupComponent } from './one-time-payment-delete-dialog.component';
import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';

@Injectable({ providedIn: 'root' })
export class OneTimePaymentResolve implements Resolve<IOneTimePayment> {
  constructor(private service: OneTimePaymentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOneTimePayment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OneTimePayment>) => response.ok),
        map((oneTimePayment: HttpResponse<OneTimePayment>) => oneTimePayment.body)
      );
    }
    return of(new OneTimePayment());
  }
}

export const oneTimePaymentRoute: Routes = [
  {
    path: '',
    component: OneTimePaymentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.oneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OneTimePaymentDetailComponent,
    resolve: {
      oneTimePayment: OneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.oneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OneTimePaymentUpdateComponent,
    resolve: {
      oneTimePayment: OneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.oneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OneTimePaymentUpdateComponent,
    resolve: {
      oneTimePayment: OneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.oneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const oneTimePaymentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OneTimePaymentDeletePopupComponent,
    resolve: {
      oneTimePayment: OneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.oneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
