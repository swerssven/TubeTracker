import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IPost } from 'src/app/interfaces/i-post';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  value: string = "";
  user!: any;
  posts: IPost[] = [];

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image emoticons table wordcount',
    skin: "oxide-dark",
    content_css: "dark"
  };

  constructor(public sanitizer: DomSanitizer, private socialService: SocialServiceService) {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  createPost(){
    let newPost: IPost = {
      userId: this.user.userId,
      userNickname: "",
      userImage: "",
      content: this.value,
      creationDate: new Date()
    }

    this.socialService.createPost(newPost).subscribe((data) => {
      this.posts = data;
    });
  }
}
