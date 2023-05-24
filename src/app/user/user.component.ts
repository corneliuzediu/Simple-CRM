import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogBeforeDeleteComponent } from '../dialog-before-delete/dialog-before-delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers = [];
  selectedUserId: string | null = null;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore) {
  }


  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userID' })
      .subscribe((changes: any) => {
        console.log('received changes:', changes);
        this.allUsers = changes;
      });
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

  toBeDeleted(userID: string) {
    this.selectedUserId = userID;
  }


  getAnswear(answear, userID) {
    if (answear === "YES" && userID == this.selectedUserId) {
      this.deleteUser(userID)
    }
    if (answear == "NO" && userID == this.selectedUserId) {
      this.selectedUserId = null;
    }
  }

  
  deleteUser(userID) {
    this.firestore
      .collection('users')
      .doc(userID)
      .delete()
      .then(() => {
        console.log('Deleted');

      })
  }

}
