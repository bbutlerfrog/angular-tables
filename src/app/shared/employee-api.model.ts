import { Employee } from './employee.model';

export interface EmployeeApi {
    total_count: number,
    items: Employee[];
}