import { Address } from './address.model';
import { Department } from './department.model';

export class Employee {
    id: Number;
    name: string;
    age: Number;
    salary: Number;
    address: Address;
    department: Department;
    dateOfJoining: string;
}