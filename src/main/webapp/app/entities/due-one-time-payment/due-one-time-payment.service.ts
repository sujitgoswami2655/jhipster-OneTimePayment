import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

type EntityResponseType = HttpResponse<IDueOneTimePayment>;
type EntityArrayResponseType = HttpResponse<IDueOneTimePayment[]>;

@Injectable({ providedIn: 'root' })
export class DueOneTimePaymentService {
  public resourceUrl = SERVER_API_URL + 'api/due-one-time-payments';

  constructor(protected http: HttpClient) {}

  create(dueOneTimePayment: IDueOneTimePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dueOneTimePayment);
    return this.http
      .post<IDueOneTimePayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dueOneTimePayment: IDueOneTimePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dueOneTimePayment);
    return this.http
      .put<IDueOneTimePayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDueOneTimePayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDueOneTimePayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(dueOneTimePayment: IDueOneTimePayment): IDueOneTimePayment {
    const copy: IDueOneTimePayment = Object.assign({}, dueOneTimePayment, {
      paymentDueDate:
        dueOneTimePayment.paymentDueDate != null && dueOneTimePayment.paymentDueDate.isValid()
          ? dueOneTimePayment.paymentDueDate.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.paymentDueDate = res.body.paymentDueDate != null ? moment(res.body.paymentDueDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dueOneTimePayment: IDueOneTimePayment) => {
        dueOneTimePayment.paymentDueDate = dueOneTimePayment.paymentDueDate != null ? moment(dueOneTimePayment.paymentDueDate) : null;
      });
    }
    return res;
  }
}
