/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { OneTimePaymentComponent } from 'app/entities/one-time-payment/one-time-payment.component';
import { OneTimePaymentService } from 'app/entities/one-time-payment/one-time-payment.service';
import { OneTimePayment } from 'app/shared/model/one-time-payment.model';

describe('Component Tests', () => {
  describe('OneTimePayment Management Component', () => {
    let comp: OneTimePaymentComponent;
    let fixture: ComponentFixture<OneTimePaymentComponent>;
    let service: OneTimePaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [OneTimePaymentComponent],
        providers: []
      })
        .overrideTemplate(OneTimePaymentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OneTimePaymentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OneTimePaymentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OneTimePayment('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.oneTimePayments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
