import { BaseModel } from "./base-model";

export class AppUser extends BaseModel {
    name: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    isManager: boolean = false;
    isOwner: boolean = false;
    isResident: boolean = false;
    isPaying: boolean = true;
    residenceId: string;
}

export class AdminAppUser extends AppUser {

}