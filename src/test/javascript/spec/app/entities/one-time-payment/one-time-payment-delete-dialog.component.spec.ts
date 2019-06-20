/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { OneTimePaymentDeleteDialogComponent } from 'app/entities/one-time-payment/one-time-payment-delete-dialog.component';
import { OneTimePaymentService } from 'app/entities/one-time-payment/one-time-payment.service';

describe('Component Tests', () => {
  describe('OneTimePayment Management Delete Component', () => {
    let comp: OneTimePaymentDeleteDialogComponent;
    let fixture: ComponentFixture<OneTimePaymentDeleteDialogComponent>;
    let service: OneTimePaymentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [OneTimePaymentDeleteDialogComponent]
      })
        .overrideTemplate(OneTimePaymentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OneTimePaymentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OneTimePaymentService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
