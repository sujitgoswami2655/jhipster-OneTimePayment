/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { LDAPContractorDeleteDialogComponent } from 'app/entities/ldap-contractor/ldap-contractor-delete-dialog.component';
import { LDAPContractorService } from 'app/entities/ldap-contractor/ldap-contractor.service';

describe('Component Tests', () => {
  describe('LDAPContractor Management Delete Component', () => {
    let comp: LDAPContractorDeleteDialogComponent;
    let fixture: ComponentFixture<LDAPContractorDeleteDialogComponent>;
    let service: LDAPContractorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [LDAPContractorDeleteDialogComponent]
      })
        .overrideTemplate(LDAPContractorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LDAPContractorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LDAPContractorService);
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
