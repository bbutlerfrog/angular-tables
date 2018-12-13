import { Injectable } from '@angular/core';

import { Department } from './department.model';


@Injectable()

export class DepartmentCollectorService {
    employee: Department;

    constructor() { }
}

