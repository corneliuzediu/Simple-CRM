import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Sort } from '@angular/material/sort';
import { DialogBeforeDeleteComponent } from '../dialog-before-delete/dialog-before-delete.component';
import { User } from 'src/models/user.class';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogBeforeDeleteSelectedComponent } from '../dialog-before-delete-selected/dialog-before-delete-selected.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  allUsers = [];
  userHolder = new User();
  selectedUserId: string | null = null;
  sortedData: any;
  userSelected: boolean = false;
  allSelected: boolean = false;
  userSelectedJSON: any[] = [];
  allowDelete: boolean = false;

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
    this.allSelected = false;
    this.dialog.open(DialogAddUserComponent)
  }


  openDeleteUserDialog(user: User, userID) {
    const dialog = this.dialog.open(DialogBeforeDeleteComponent);
    dialog.componentInstance.user = new User(user);
    dialog.componentInstance.userID = userID;
  }


  openDeleteSelectedDialog() {
    const dialog = this.dialog.open(DialogBeforeDeleteSelectedComponent);
    dialog.componentInstance.userSelectedJSON = this.userSelectedJSON;
    dialog.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.allowDelete = false;
        this.allSelected = false;
      }
    });
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

  //Funktions for selectors
  selectAll() {
    let all = this.checkAllSelected()
    if (!all) {
      for (let i = 0; i < this.sortedData.length; i++) {
        this.sortedData[i].select = true;
        let obj = {
          firstName: this.sortedData[i].firstName,
          lastName: this.sortedData[i].lastName,
          id: this.sortedData[i].userID
        }
        this.userSelectedJSON.push(obj);
      }
    } else {
      for (let i = 0; i < this.sortedData.length; i++) {
        this.updateSelect(this.allUsers[i]);
      }
    }
    this.allSelected = this.checkAllSelected();
    this.allowDelete = true ? this.allSelected || this.userSelected : this.allowDelete = false;
    if (!this.checkAllSelected()) {
      this.userSelectedJSON = [];
    }


  }


  updateSelect(user) {
    user.select = !user.select;
    this.userSelected = true ? this.checkSelect() : this.userSelected = false;
    this.allowDelete = true ? this.userSelected || this.allSelected : false;
    this.allSelected = this.checkAllSelected();
    if (user.select) {
      let obj = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.userID
      }
      this.userSelectedJSON.push(obj)
    } else {
      let index = this.userSelectedJSON.findIndex((obj) => obj.id === user.userID);
      if (index !== -1) {
        this.userSelectedJSON.splice(index, 1);
      }
    }
  }


  checkAllSelected() {
    return this.allSelected = this.allUsers.every((user) => user.select);
  }

  checkSelect() {
    return this.userSelected = !this.allUsers.every((user) => !user.select);
  }


};

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
