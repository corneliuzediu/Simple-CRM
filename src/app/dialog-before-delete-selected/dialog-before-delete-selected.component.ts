import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-before-delete-selected',
  templateUrl: './dialog-before-delete-selected.component.html',
  styleUrls: ['./dialog-before-delete-selected.component.scss']
})

export class DialogBeforeDeleteSelectedComponent {
  userSelectedJSON: any[] = [];
  allowDelete: boolean;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public dialogRef: MatDialogRef<DialogBeforeDeleteSelectedComponent>,
  ) { }

  ngOnInit(): void {
  }

  getAnswear(answear: string) {
    if (answear === "YES") {
      for (let i = 0; i < this.userSelectedJSON.length; i++) {
        this.deleteUser(this.userSelectedJSON[i].id);
        this.dialogRef.close('deleted');
      }
    } else {
      this.dialogRef.close();
    }
  }

  deleteUser(userID: string) {
    this.firestore
      .collection('users')
      .doc(userID)
      .delete()
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['/user']);
      })
  }

}
