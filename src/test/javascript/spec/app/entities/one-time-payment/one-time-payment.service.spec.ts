/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OneTimePaymentService } from 'app/entities/one-time-payment/one-time-payment.service';
import { IOneTimePayment, OneTimePayment } from 'app/shared/model/one-time-payment.model';

describe('Service Tests', () => {
  describe('OneTimePayment Service', () => {
    let injector: TestBed;
    let service: OneTimePaymentService;
    let httpMock: HttpTestingController;
    let elemDefault: IOneTimePayment;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(OneTimePaymentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OneTimePayment('ID', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            paymentDue: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a OneTimePayment', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            paymentDue: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            paymentDue: currentDate
          },
          returnedFromService
        );
        service
          .create(new OneTimePayment(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a OneTimePayment', async () => {
        const returnedFromService = Object.assign(
          {
            amount: 'BBBBBB',
            paymentDue: currentDate.format(DATE_TIME_FORMAT),
            contractorID: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            paymentDue: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of OneTimePayment', async () => {
        const returnedFromService = Object.assign(
          {
            amount: 'BBBBBB',
            paymentDue: currentDate.format(DATE_TIME_FORMAT),
            contractorID: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            paymentDue: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OneTimePayment', async () => {
        const rxPromise = service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
