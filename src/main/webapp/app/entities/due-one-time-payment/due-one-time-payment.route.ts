import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';
import { DueOneTimePaymentService } from './due-one-time-payment.service';
import { DueOneTimePaymentComponent } from './due-one-time-payment.component';
import { DueOneTimePaymentDetailComponent } from './due-one-time-payment-detail.component';
import { DueOneTimePaymentUpdateComponent } from './due-one-time-payment-update.component';
import { DueOneTimePaymentDeletePopupComponent } from './due-one-time-payment-delete-dialog.component';
import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

@Injectable({ providedIn: 'root' })
export class DueOneTimePaymentResolve implements Resolve<IDueOneTimePayment> {
  constructor(private service: DueOneTimePaymentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDueOneTimePayment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DueOneTimePayment>) => response.ok),
        map((dueOneTimePayment: HttpResponse<DueOneTimePayment>) => dueOneTimePayment.body)
      );
    }
    return of(new DueOneTimePayment());
  }
}

export const dueOneTimePaymentRoute: Routes = [
  {
    path: '',
    component: DueOneTimePaymentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.dueOneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DueOneTimePaymentDetailComponent,
    resolve: {
      dueOneTimePayment: DueOneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.dueOneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DueOneTimePaymentUpdateComponent,
    resolve: {
      dueOneTimePayment: DueOneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.dueOneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DueOneTimePaymentUpdateComponent,
    resolve: {
      dueOneTimePayment: DueOneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.dueOneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dueOneTimePaymentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DueOneTimePaymentDeletePopupComponent,
    resolve: {
      dueOneTimePayment: DueOneTimePaymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pocOneTimePaymentApp.dueOneTimePayment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
