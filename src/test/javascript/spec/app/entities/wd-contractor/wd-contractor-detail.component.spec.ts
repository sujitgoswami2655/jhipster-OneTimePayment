/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PocOneTimePaymentTestModule } from '../../../test.module';
import { WDContractorDetailComponent } from 'app/entities/wd-contractor/wd-contractor-detail.component';
import { WDContractor } from 'app/shared/model/wd-contractor.model';

describe('Component Tests', () => {
  describe('WDContractor Management Detail Component', () => {
    let comp: WDContractorDetailComponent;
    let fixture: ComponentFixture<WDContractorDetailComponent>;
    const route = ({ data: of({ wDContractor: new WDContractor('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PocOneTimePaymentTestModule],
        declarations: [WDContractorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WDContractorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WDContractorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wDContractor).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
