import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { Product } from 'src/models/product.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  allProducts: [];
  sortedData: any;

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
        this.sortedData = this.allProducts.slice();
      })
  }


  openDialogProduct() {
    this.dialog.open(DialogAddProductComponent)
  }

  sortData(sort: Sort) {
    const data = this.allProducts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a['name'], b['name'], isAsc);
        case 'price':
          return compare(a['price'], b['price'], isAsc);
        case 'amount':
          return compare(a['amount'], b['amount'], isAsc);
        default:
          return 0;
      }
    });
  };
};

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
