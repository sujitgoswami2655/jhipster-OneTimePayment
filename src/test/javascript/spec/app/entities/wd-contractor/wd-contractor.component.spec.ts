/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { WDContractorComponent } from 'app/entities/wd-contractor/wd-contractor.component';
import { WDContractorService } from 'app/entities/wd-contractor/wd-contractor.service';
import { WDContractor } from 'app/shared/model/wd-contractor.model';

describe('Component Tests', () => {
  describe('WDContractor Management Component', () => {
    let comp: WDContractorComponent;
    let fixture: ComponentFixture<WDContractorComponent>;
    let service: WDContractorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [WDContractorComponent],
        providers: []
      })
        .overrideTemplate(WDContractorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WDContractorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WDContractorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WDContractor('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.wDContractors[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
