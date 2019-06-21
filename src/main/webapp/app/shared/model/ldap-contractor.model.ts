import { Moment } from 'moment';
import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';

export interface ILDAPContractor {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  startDate?: Moment;
  commissionPct?: number;
  contractorID?: string;
  contractorIDS?: IDueOneTimePayment[];
}

export class LDAPContractor implements ILDAPContractor {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public startDate?: Moment,
    public commissionPct?: number,
    public contractorID?: string,
    public contractorIDS?: IDueOneTimePayment[]
  ) {}
}
