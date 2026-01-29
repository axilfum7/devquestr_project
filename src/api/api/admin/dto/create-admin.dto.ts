export class CreateAdminDto {
    full_name:string;
    username:string;
    phone_number:string;
    hashed_password:string;
    email?:string;
    role:string;
}
