import {UserRole} from './role';
import {Employee} from "../employee";

export interface User {
  id?: number;
  userName?: string;
  userCode?: string;
  password?: string;
  roles?: UserRole[];
  employee?: Employee[];
}
