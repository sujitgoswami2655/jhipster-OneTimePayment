/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { DueOneTimePaymentDetailComponent } from 'app/entities/due-one-time-payment/due-one-time-payment-detail.component';
import { DueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

describe('Component Tests', () => {
  describe('DueOneTimePayment Management Detail Component', () => {
    let comp: DueOneTimePaymentDetailComponent;
    let fixture: ComponentFixture<DueOneTimePaymentDetailComponent>;
    const route = ({ data: of({ dueOneTimePayment: new DueOneTimePayment('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [DueOneTimePaymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DueOneTimePaymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DueOneTimePaymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dueOneTimePayment).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
