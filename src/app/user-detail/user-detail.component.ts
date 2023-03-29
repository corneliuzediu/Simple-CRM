import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  urlID: string;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,

  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.urlID = paramMap.get('id')
      console.log(this.urlID);
      this.getUser();

    })
  }


  getUser() {
    this.firestore
      .collection('users')
      .doc(this.urlID)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
      })
  }


  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.urlID;
  }
}
