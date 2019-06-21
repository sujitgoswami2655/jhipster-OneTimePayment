/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { DueOneTimePaymentDeleteDialogComponent } from 'app/entities/due-one-time-payment/due-one-time-payment-delete-dialog.component';
import { DueOneTimePaymentService } from 'app/entities/due-one-time-payment/due-one-time-payment.service';

describe('Component Tests', () => {
  describe('DueOneTimePayment Management Delete Component', () => {
    let comp: DueOneTimePaymentDeleteDialogComponent;
    let fixture: ComponentFixture<DueOneTimePaymentDeleteDialogComponent>;
    let service: DueOneTimePaymentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [DueOneTimePaymentDeleteDialogComponent]
      })
        .overrideTemplate(DueOneTimePaymentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DueOneTimePaymentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DueOneTimePaymentService);
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
