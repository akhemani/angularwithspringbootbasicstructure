import { Address } from './address.model';
import { Department } from './department.model';
import { Designation } from './designation.model';

export class Employee {
    id: Number;
    name: string;
    age: Number;
    salary: Number;
    email: string;
    status: Number;
    address: Address;
    department: Department;
    designation: Designation;
    dateOfJoining: string;
}