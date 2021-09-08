import {Employee} from './employee';
import {Role} from './role';

export interface User {
  userId: number;
  email: string;
  enabled: boolean;
  password: string;
  userCode: string;
  employee: Employee;
  roles: Role[];
}
