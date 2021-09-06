import {Employee} from './employee';

export interface User {
  userId: number;
  email: string;
  enabled: boolean;
  password: string;
  userCode: string;
  employee: Employee;
}
