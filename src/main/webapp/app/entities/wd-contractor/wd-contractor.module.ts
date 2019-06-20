import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PocOneTimePaymentSharedModule } from 'app/shared';
import {
  WDContractorComponent,
  WDContractorDetailComponent,
  WDContractorUpdateComponent,
  WDContractorDeletePopupComponent,
  WDContractorDeleteDialogComponent,
  wDContractorRoute,
  wDContractorPopupRoute
} from './';

const ENTITY_STATES = [...wDContractorRoute, ...wDContractorPopupRoute];

@NgModule({
  imports: [PocOneTimePaymentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WDContractorComponent,
    WDContractorDetailComponent,
    WDContractorUpdateComponent,
    WDContractorDeleteDialogComponent,
    WDContractorDeletePopupComponent
  ],
  entryComponents: [
    WDContractorComponent,
    WDContractorUpdateComponent,
    WDContractorDeleteDialogComponent,
    WDContractorDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentWDContractorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
