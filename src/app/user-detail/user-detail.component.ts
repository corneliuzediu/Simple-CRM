import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogBeforeDeleteComponent } from '../dialog-before-delete/dialog-before-delete.component';
import { DialogWallpaperComponent } from '../dialog-wallpaper/dialog-wallpaper.component';
import { DialogIconComponent } from '../dialog-icon/dialog-icon.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  urlID: string;
  loading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,

  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.urlID = paramMap.get('id')
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


  changeImgHeader() {
    const dialog = this.dialog.open(DialogWallpaperComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.urlID;
  }


  changeImgUser() {
    const dialog = this.dialog.open(DialogIconComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.urlID;
  }


  openDeleteUserDialog() {
    const dialog = this.dialog.open(DialogBeforeDeleteComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.urlID;
  }

  saveNotes() {
    this.loading = true
    this.firestore
      .collection('users')
      .doc(this.urlID)
      .update(this.user.toJSON())
      .then(() => {
        setTimeout(() => { this.loading = false }, 255);
      })
  }
}
