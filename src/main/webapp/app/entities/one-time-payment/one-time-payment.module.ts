import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PocOneTimePaymentSharedModule } from 'app/shared';
import {
  OneTimePaymentComponent,
  OneTimePaymentDetailComponent,
  OneTimePaymentUpdateComponent,
  OneTimePaymentDeletePopupComponent,
  OneTimePaymentDeleteDialogComponent,
  oneTimePaymentRoute,
  oneTimePaymentPopupRoute
} from './';

const ENTITY_STATES = [...oneTimePaymentRoute, ...oneTimePaymentPopupRoute];

@NgModule({
  imports: [PocOneTimePaymentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OneTimePaymentComponent,
    OneTimePaymentDetailComponent,
    OneTimePaymentUpdateComponent,
    OneTimePaymentDeleteDialogComponent,
    OneTimePaymentDeletePopupComponent
  ],
  entryComponents: [
    OneTimePaymentComponent,
    OneTimePaymentUpdateComponent,
    OneTimePaymentDeleteDialogComponent,
    OneTimePaymentDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentOneTimePaymentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
