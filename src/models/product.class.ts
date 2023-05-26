export class Product {
    name: string;
    description: string;
    price: number;
    availability: number;
    amount: number;
    aquiredBy: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.price = obj ? obj.price : '';
        this.availability = obj ? obj.availability : '';
        this.amount = obj ? obj.amount : '';
        this.aquiredBy = obj ? obj.aquiredBy : '';
    }


    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            availability: this.availability,
            amount: this.amount,
            aquiredBy: this.aquiredBy,
        }
    }
}