import { Employee } from './employee.model';
import { Role } from './role.model';

export class Users {
    id: Number;
    userName: string;
    password: string;
    role: Role;
    employee: Employee;
}