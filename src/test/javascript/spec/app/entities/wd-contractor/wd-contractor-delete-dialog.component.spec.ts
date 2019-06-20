/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { WDContractorDeleteDialogComponent } from 'app/entities/wd-contractor/wd-contractor-delete-dialog.component';
import { WDContractorService } from 'app/entities/wd-contractor/wd-contractor.service';

describe('Component Tests', () => {
  describe('WDContractor Management Delete Component', () => {
    let comp: WDContractorDeleteDialogComponent;
    let fixture: ComponentFixture<WDContractorDeleteDialogComponent>;
    let service: WDContractorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [WDContractorDeleteDialogComponent]
      })
        .overrideTemplate(WDContractorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WDContractorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WDContractorService);
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
