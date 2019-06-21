/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { DueOneTimePaymentComponent } from 'app/entities/due-one-time-payment/due-one-time-payment.component';
import { DueOneTimePaymentService } from 'app/entities/due-one-time-payment/due-one-time-payment.service';
import { DueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

describe('Component Tests', () => {
  describe('DueOneTimePayment Management Component', () => {
    let comp: DueOneTimePaymentComponent;
    let fixture: ComponentFixture<DueOneTimePaymentComponent>;
    let service: DueOneTimePaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [DueOneTimePaymentComponent],
        providers: []
      })
        .overrideTemplate(DueOneTimePaymentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DueOneTimePaymentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DueOneTimePaymentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DueOneTimePayment('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dueOneTimePayments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
