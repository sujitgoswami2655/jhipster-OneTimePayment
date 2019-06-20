/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { LDAPContractorComponent } from 'app/entities/ldap-contractor/ldap-contractor.component';
import { LDAPContractorService } from 'app/entities/ldap-contractor/ldap-contractor.service';
import { LDAPContractor } from 'app/shared/model/ldap-contractor.model';

describe('Component Tests', () => {
  describe('LDAPContractor Management Component', () => {
    let comp: LDAPContractorComponent;
    let fixture: ComponentFixture<LDAPContractorComponent>;
    let service: LDAPContractorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [LDAPContractorComponent],
        providers: []
      })
        .overrideTemplate(LDAPContractorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LDAPContractorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LDAPContractorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LDAPContractor('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lDAPContractors[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
