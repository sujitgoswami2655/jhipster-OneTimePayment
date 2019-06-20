import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PocOneTimePaymentSharedModule } from 'app/shared';
import {
  LDAPContractorComponent,
  LDAPContractorDetailComponent,
  LDAPContractorUpdateComponent,
  LDAPContractorDeletePopupComponent,
  LDAPContractorDeleteDialogComponent,
  lDAPContractorRoute,
  lDAPContractorPopupRoute
} from './';

const ENTITY_STATES = [...lDAPContractorRoute, ...lDAPContractorPopupRoute];

@NgModule({
  imports: [PocOneTimePaymentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LDAPContractorComponent,
    LDAPContractorDetailComponent,
    LDAPContractorUpdateComponent,
    LDAPContractorDeleteDialogComponent,
    LDAPContractorDeletePopupComponent
  ],
  entryComponents: [
    LDAPContractorComponent,
    LDAPContractorUpdateComponent,
    LDAPContractorDeleteDialogComponent,
    LDAPContractorDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentLDAPContractorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
