import { Moment } from 'moment';
import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';

export interface IWDContractor {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  startDate?: Moment;
  commissionPct?: number;
  workdayNo?: string;
  contractorID?: string;
  contractorIDS?: IOneTimePayment[];
}

export class WDContractor implements IWDContractor {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public startDate?: Moment,
    public commissionPct?: number,
    public workdayNo?: string,
    public contractorID?: string,
    public contractorIDS?: IOneTimePayment[]
  ) {}
}
