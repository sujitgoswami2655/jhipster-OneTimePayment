/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { OneTimePaymentDetailComponent } from 'app/entities/one-time-payment/one-time-payment-detail.component';
import { OneTimePayment } from 'app/shared/model/one-time-payment.model';

describe('Component Tests', () => {
  describe('OneTimePayment Management Detail Component', () => {
    let comp: OneTimePaymentDetailComponent;
    let fixture: ComponentFixture<OneTimePaymentDetailComponent>;
    const route = ({ data: of({ oneTimePayment: new OneTimePayment('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [OneTimePaymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OneTimePaymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OneTimePaymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.oneTimePayment).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
