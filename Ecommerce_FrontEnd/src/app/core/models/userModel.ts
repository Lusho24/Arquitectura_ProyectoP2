export interface UserModel {
    id: string;
    idTienda: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    roles: RoleModel[];
}

export interface RoleModel {
    id: number;
    name: string;
}