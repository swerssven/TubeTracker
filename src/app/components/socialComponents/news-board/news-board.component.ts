import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/i-post';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-news-board',
  templateUrl: './news-board.component.html',
  styleUrls: ['./news-board.component.scss']
})
export class NewsBoardComponent {
  value: string = "";
  user!: any;
  posts: IPost[] = [];
  private subscriptions: Subscription = new Subscription();

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image emoticons table wordcount preview',
    skin: "oxide-dark",
    content_css: "dark"
  };

  constructor(public sanitizer: DomSanitizer, private socialService: SocialServiceService) {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(this.socialService.getPosts(true, this.user.userId).subscribe((data) => {
      this.posts = data;
    }));
  }

  createPost(){
    let newPost: IPost = {
      userId: this.user.userId,
      userNickname: this.user.nickname,
      userImage: this.user.image,
      content: this.value,
      creationDate: new Date
    }

    this.posts.unshift(newPost)

    this.subscriptions.add(this.socialService.createPost(newPost).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
