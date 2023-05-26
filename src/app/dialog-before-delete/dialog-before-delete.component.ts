import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-before-delete',
  templateUrl: './dialog-before-delete.component.html',
  styleUrls: ['./dialog-before-delete.component.scss']
})
export class DialogBeforeDeleteComponent {
  user: User;
  userID: string;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public dialogRef: MatDialogRef<DialogBeforeDeleteComponent>,
  ) { }

  ngOnInit(): void {

  }

  getAnswear(answear: string) {
    if (answear === "YES") {
      this.deleteUser(this.userID);
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
