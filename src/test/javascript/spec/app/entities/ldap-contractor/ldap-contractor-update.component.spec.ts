/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { LDAPContractorUpdateComponent } from 'app/entities/ldap-contractor/ldap-contractor-update.component';
import { LDAPContractorService } from 'app/entities/ldap-contractor/ldap-contractor.service';
import { LDAPContractor } from 'app/shared/model/ldap-contractor.model';

describe('Component Tests', () => {
  describe('LDAPContractor Management Update Component', () => {
    let comp: LDAPContractorUpdateComponent;
    let fixture: ComponentFixture<LDAPContractorUpdateComponent>;
    let service: LDAPContractorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [LDAPContractorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LDAPContractorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LDAPContractorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LDAPContractorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LDAPContractor('123');
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
        const entity = new LDAPContractor();
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
