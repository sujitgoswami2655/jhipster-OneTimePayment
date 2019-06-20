/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { WDContractorUpdateComponent } from 'app/entities/wd-contractor/wd-contractor-update.component';
import { WDContractorService } from 'app/entities/wd-contractor/wd-contractor.service';
import { WDContractor } from 'app/shared/model/wd-contractor.model';

describe('Component Tests', () => {
  describe('WDContractor Management Update Component', () => {
    let comp: WDContractorUpdateComponent;
    let fixture: ComponentFixture<WDContractorUpdateComponent>;
    let service: WDContractorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [WDContractorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WDContractorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WDContractorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WDContractorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WDContractor('123');
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
        const entity = new WDContractor();
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
