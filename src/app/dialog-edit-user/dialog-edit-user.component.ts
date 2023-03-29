import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User;
  userID: string;
  loading: boolean = false;
  birthDate: Date;


  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
  ) { }


  ngOnInit(): void {
  }


  updateUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime()

    this.firestore
      .collection('users')
      .doc(this.userID)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }

}
