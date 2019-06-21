import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PocOneTimePaymentSharedModule } from 'app/shared';
import {
  DueOneTimePaymentComponent,
  DueOneTimePaymentDetailComponent,
  DueOneTimePaymentUpdateComponent,
  DueOneTimePaymentDeletePopupComponent,
  DueOneTimePaymentDeleteDialogComponent,
  dueOneTimePaymentRoute,
  dueOneTimePaymentPopupRoute
} from './';

const ENTITY_STATES = [...dueOneTimePaymentRoute, ...dueOneTimePaymentPopupRoute];

@NgModule({
  imports: [PocOneTimePaymentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DueOneTimePaymentComponent,
    DueOneTimePaymentDetailComponent,
    DueOneTimePaymentUpdateComponent,
    DueOneTimePaymentDeleteDialogComponent,
    DueOneTimePaymentDeletePopupComponent
  ],
  entryComponents: [
    DueOneTimePaymentComponent,
    DueOneTimePaymentUpdateComponent,
    DueOneTimePaymentDeleteDialogComponent,
    DueOneTimePaymentDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentDueOneTimePaymentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
