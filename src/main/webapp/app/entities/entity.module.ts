import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'wd-contractor',
        loadChildren: './wd-contractor/wd-contractor.module#PocOneTimePaymentWDContractorModule'
      },
      {
        path: 'ldap-contractor',
        loadChildren: './ldap-contractor/ldap-contractor.module#PocOneTimePaymentLDAPContractorModule'
      },
      {
        path: 'one-time-payment',
        loadChildren: './one-time-payment/one-time-payment.module#PocOneTimePaymentOneTimePaymentModule'
      },
      {
        path: 'due-one-time-payment',
        loadChildren: './due-one-time-payment/due-one-time-payment.module#PocOneTimePaymentDueOneTimePaymentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentEntityModule {}
