import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-product-customer',
  templateUrl: './dialog-add-product-customer.component.html',
  styleUrls: ['./dialog-add-product-customer.component.scss']
})
export class DialogAddProductCustomerComponent {
  allProducts = [];
  user: User;
  userID: string;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('products')
      .valueChanges({ idField: 'productID' })
      .subscribe((changes: any) => {
        this.allProducts = changes;
        console.log(this.user);
        
});
  }

  addProductToCustomer(product) {
    this.user.products.push(product);

    this.firestore
    .collection('users')
    .doc(this.userID)
    .update(this.user.toJSON())
    .then(()=> {
      console.log('Done');

    })
  }
}
