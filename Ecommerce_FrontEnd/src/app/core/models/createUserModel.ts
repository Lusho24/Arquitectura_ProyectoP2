export interface CreateUserModel {
    id?: string;
    idTienda?: number;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
    roles?: string[];
}