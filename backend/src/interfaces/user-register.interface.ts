export interface UserRegister {
    email:        string;
    password:     string;
    roleId:       string;
    employeeData: EmployeeData;
}

export interface EmployeeData {
    firstName:    string;
    lastName:     string;
    positionId:   string;
    departmentId: string;
}
