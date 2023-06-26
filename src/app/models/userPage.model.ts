export interface UserPage {
    currentPage: number;
    totalPages:  number;
    pageSize:    number; 
    userDTOS:    UserDTO[];
}

export interface UserDTO {
    idUser:    number;
    lastName:  string;
    firstName: string;
    email:     string;
    password:  string;
    telephone: string;
    address:   string;
    roles:     Role[];
}

export interface Role {
    idRole:   number;
    roleName: string;
}