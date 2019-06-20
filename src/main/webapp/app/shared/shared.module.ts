import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PocOneTimePaymentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PocOneTimePaymentSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PocOneTimePaymentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocOneTimePaymentSharedModule {
  static forRoot() {
    return {
      ngModule: PocOneTimePaymentSharedModule
    };
  }
}
