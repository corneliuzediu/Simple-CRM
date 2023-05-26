import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-icon',
  templateUrl: './dialog-icon.component.html',
  styleUrls: ['./dialog-icon.component.scss']
})
export class DialogIconComponent {
  user: User;
  userID: string;
  avatars = ['user_1.png', 'user_2.png', 'user_3.png', 'user_4.png', 'user_5.png', 'user_6.png'];


  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogIconComponent>,
  ) {

  }

  setAvatar(image) {

    this.user.imgUser = './assets/img/userIMG/' + image;
    this.firestore
      .collection('users')
      .doc(this.userID)
      .update(this.user.toJSON())
  }


}
