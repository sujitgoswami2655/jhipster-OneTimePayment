import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';

type EntityResponseType = HttpResponse<IWDContractor>;
type EntityArrayResponseType = HttpResponse<IWDContractor[]>;

@Injectable({ providedIn: 'root' })
export class WDContractorService {
  public resourceUrl = SERVER_API_URL + 'api/wd-contractors';

  constructor(protected http: HttpClient) {}

  create(wDContractor: IWDContractor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wDContractor);
    return this.http
      .post<IWDContractor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(wDContractor: IWDContractor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wDContractor);
    return this.http
      .put<IWDContractor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IWDContractor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWDContractor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(wDContractor: IWDContractor): IWDContractor {
    const copy: IWDContractor = Object.assign({}, wDContractor, {
      startDate: wDContractor.startDate != null && wDContractor.startDate.isValid() ? wDContractor.startDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((wDContractor: IWDContractor) => {
        wDContractor.startDate = wDContractor.startDate != null ? moment(wDContractor.startDate) : null;
      });
    }
    return res;
  }
}
