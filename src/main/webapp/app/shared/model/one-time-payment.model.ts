import { Moment } from 'moment';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';

export interface IOneTimePayment {
  id?: string;
  amount?: string;
  paymentDue?: Moment;
  contractorID?: string;
  wDContractor?: IWDContractor;
  lDAPContractor?: ILDAPContractor;
}

export class OneTimePayment implements IOneTimePayment {
  constructor(
    public id?: string,
    public amount?: string,
    public paymentDue?: Moment,
    public contractorID?: string,
    public wDContractor?: IWDContractor,
    public lDAPContractor?: ILDAPContractor
  ) {}
}
