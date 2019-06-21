import { Moment } from 'moment';
import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';

export interface IDueOneTimePayment {
  id?: string;
  amount?: number;
  paymentDueDate?: Moment;
  contractorID?: string;
  contractorID?: IWDContractor;
  contractorID?: ILDAPContractor;
}

export class DueOneTimePayment implements IDueOneTimePayment {
  constructor(
    public id?: string,
    public amount?: number,
    public paymentDueDate?: Moment,
    public contractorID?: string,
    public contractorID?: IWDContractor,
    public contractorID?: ILDAPContractor
  ) {}
}
