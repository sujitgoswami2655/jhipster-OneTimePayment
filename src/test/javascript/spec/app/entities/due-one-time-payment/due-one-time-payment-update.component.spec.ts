/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { DueOneTimePaymentUpdateComponent } from 'app/entities/due-one-time-payment/due-one-time-payment-update.component';
import { DueOneTimePaymentService } from 'app/entities/due-one-time-payment/due-one-time-payment.service';
import { DueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

describe('Component Tests', () => {
  describe('DueOneTimePayment Management Update Component', () => {
    let comp: DueOneTimePaymentUpdateComponent;
    let fixture: ComponentFixture<DueOneTimePaymentUpdateComponent>;
    let service: DueOneTimePaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [DueOneTimePaymentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DueOneTimePaymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DueOneTimePaymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DueOneTimePaymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DueOneTimePayment('123');
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
        const entity = new DueOneTimePayment();
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
