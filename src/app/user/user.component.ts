import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Sort } from '@angular/material/sort';
import { DialogBeforeDeleteComponent } from '../dialog-before-delete/dialog-before-delete.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  allUsers = [];
  selectedUserId: string | null = null;
  sortedData: any;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }


  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userID' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.sortedData = this.allUsers.slice()
      });
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

  openDeleteUserDialog(user: User, userID) {
    const dialog = this.dialog.open(DialogBeforeDeleteComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userID = userID;

  }


toBeDeleted(userID: string) {
  this.selectedUserId = userID;
}


getAnswear(answear: string, userID: string) {
  if (answear === "YES" && userID == this.selectedUserId) {
    this.deleteUser(userID)
  }
  if (answear == "NO" && userID == this.selectedUserId) {
    this.selectedUserId = null;
  }
}


deleteUser(userID: string) {
  this.firestore
    .collection('users')
    .doc(userID)
    .delete()
    .then(() => {
    })
}

sortData(sort: Sort) {
  const data = this.allUsers.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }
  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name':
        return compare(a.firstName, b.firstName, isAsc);
      case 'email':
        return compare(a.email, b.email, isAsc);
      case 'city':
        return compare(a.city, b.city, isAsc);
      default:
        return 0;
    }
  });
};
};

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
