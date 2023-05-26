import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/models/product.class';

@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})
export class DialogAddProductComponent {
  product = new Product();
  loading: boolean = false;
  availability: Date;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
  ) { }


  saveProduct() {
    this.loading = true;
    if (this.availability != undefined)
      this.product.availability = this.availability.getTime();

    this.firestore
      .collection('products')
      .add(this.product.toJSON())
      .then((result: any) => {
        this.loading = false;
        // this.dialogRef.close();
      });
  }
}
