import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';

type EntityResponseType = HttpResponse<IOneTimePayment>;
type EntityArrayResponseType = HttpResponse<IOneTimePayment[]>;

@Injectable({ providedIn: 'root' })
export class OneTimePaymentService {
  public resourceUrl = SERVER_API_URL + 'api/one-time-payments';

  constructor(protected http: HttpClient) {}

  create(oneTimePayment: IOneTimePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oneTimePayment);
    return this.http
      .post<IOneTimePayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(oneTimePayment: IOneTimePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oneTimePayment);
    return this.http
      .put<IOneTimePayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IOneTimePayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOneTimePayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(oneTimePayment: IOneTimePayment): IOneTimePayment {
    const copy: IOneTimePayment = Object.assign({}, oneTimePayment, {
      paymentDue: oneTimePayment.paymentDue != null && oneTimePayment.paymentDue.isValid() ? oneTimePayment.paymentDue.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.paymentDue = res.body.paymentDue != null ? moment(res.body.paymentDue) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((oneTimePayment: IOneTimePayment) => {
        oneTimePayment.paymentDue = oneTimePayment.paymentDue != null ? moment(oneTimePayment.paymentDue) : null;
      });
    }
    return res;
  }
}
