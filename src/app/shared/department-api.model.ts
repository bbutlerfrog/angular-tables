import { Department } from './department.model';

export interface DepartmentApi {
    items: Department[];
    total_count: number;
}