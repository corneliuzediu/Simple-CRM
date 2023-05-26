import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-wallpaper',
  templateUrl: './dialog-wallpaper.component.html',
  styleUrls: ['./dialog-wallpaper.component.scss']
})
export class DialogWallpaperComponent {
  user: User;
  userID: string;
  wallpapers = ['header_img.jpg', 'wallpaper_1.jpg', 'wallpaper_2.jpg', 'wallpaper_3.jpg', 'wallpaper_4.jpg']

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogWallpaperComponent>,
  ) {

  }

  ngOnInit(): void {
  }

  setWallpaper(image: string) {
    this.user.imgHeader = './assets/img/wallpaperIMG/'+image;
    this.firestore
    .collection('users')
    .doc(this.userID)
    .update(this.user.toJSON())
  }
}

