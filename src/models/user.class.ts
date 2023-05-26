export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    email: string;
    imgHeader: string;
    imgUser: string;
    notes:string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.notes = obj ? obj.notes : '';
        this.imgHeader = obj ? obj.imgHeader : './assets/img/wallpaperIMG/header_img.jpg';
        this.imgUser = obj ? obj.imgUser : './assets/img/userIMG/user.png';
    }


    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            notes: this.notes,
            imgHeader:this.imgHeader,
            imgUser:this.imgUser
        }
    }
}