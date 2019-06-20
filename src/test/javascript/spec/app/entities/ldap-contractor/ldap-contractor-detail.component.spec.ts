/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { LDAPContractorDetailComponent } from 'app/entities/ldap-contractor/ldap-contractor-detail.component';
import { LDAPContractor } from 'app/shared/model/ldap-contractor.model';

describe('Component Tests', () => {
  describe('LDAPContractor Management Detail Component', () => {
    let comp: LDAPContractorDetailComponent;
    let fixture: ComponentFixture<LDAPContractorDetailComponent>;
    const route = ({ data: of({ lDAPContractor: new LDAPContractor('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [LDAPContractorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LDAPContractorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LDAPContractorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lDAPContractor).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
