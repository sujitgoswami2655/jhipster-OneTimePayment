/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { OneTimePaymentUpdateComponent } from 'app/entities/one-time-payment/one-time-payment-update.component';
import { OneTimePaymentService } from 'app/entities/one-time-payment/one-time-payment.service';
import { OneTimePayment } from 'app/shared/model/one-time-payment.model';

describe('Component Tests', () => {
  describe('OneTimePayment Management Update Component', () => {
    let comp: OneTimePaymentUpdateComponent;
    let fixture: ComponentFixture<OneTimePaymentUpdateComponent>;
    let service: OneTimePaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [OneTimePaymentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OneTimePaymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OneTimePaymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OneTimePaymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OneTimePayment('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OneTimePayment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
