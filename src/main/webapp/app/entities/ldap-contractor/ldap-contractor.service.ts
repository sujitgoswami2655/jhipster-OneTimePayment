import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';

type EntityResponseType = HttpResponse<ILDAPContractor>;
type EntityArrayResponseType = HttpResponse<ILDAPContractor[]>;

@Injectable({ providedIn: 'root' })
export class LDAPContractorService {
  public resourceUrl = SERVER_API_URL + 'api/ldap-contractors';

  constructor(protected http: HttpClient) {}

  create(lDAPContractor: ILDAPContractor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lDAPContractor);
    return this.http
      .post<ILDAPContractor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lDAPContractor: ILDAPContractor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lDAPContractor);
    return this.http
      .put<ILDAPContractor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ILDAPContractor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILDAPContractor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(lDAPContractor: ILDAPContractor): ILDAPContractor {
    const copy: ILDAPContractor = Object.assign({}, lDAPContractor, {
      startDate: lDAPContractor.startDate != null && lDAPContractor.startDate.isValid() ? lDAPContractor.startDate.toJSON() : null
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
      res.body.forEach((lDAPContractor: ILDAPContractor) => {
        lDAPContractor.startDate = lDAPContractor.startDate != null ? moment(lDAPContractor.startDate) : null;
      });
    }
    return res;
  }
}
