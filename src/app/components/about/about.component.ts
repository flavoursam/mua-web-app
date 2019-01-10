import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  profilePicURL = 'https://instagram.fsyd4-1.fna.fbcdn.net/vp/c52ea9df782eb6848d057db568050551/5C8F0B53/t51.2885-15/sh0.08/e35/s640x640/42731700_177685769804244_312002806382756791_n.jpg';
  profilePic: any;
  isImageLoading: boolean;


  constructor(private request: ApiService) { }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.isImageLoading = true;
    this.request.getProfilePic(this.profilePicURL).subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      err => {
        this.isImageLoading = false;
        console.log('Error loading profile picture: ', err);
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.profilePic = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
