import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/i-post';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  isLoading: boolean = false;
  value: string = '';
  userId!: number;
  userImage!: string;
  userNickname!: string;
  localUser!: any;
  posts: IPost[] = [];
  show: boolean = false;
  private subscriptions: Subscription = new Subscription();

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image emoticons table wordcount',
    skin: 'oxide-dark',
    content_css: 'dark',
  };

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private socialService: SocialServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.localUser = userString ? JSON.parse(userString) : null;
    }
    this.userId = +this.route.params.subscribe((params) => {
      // Accede al nuevo valor del ID
      this.userId = +params['id'];
      this.show = false;

      if(this.userId != this.localUser.userId){
        this.show = true;
      }

      this.subscriptions.add(
        this.socialService.getPosts(false, this.userId).subscribe((data) => {
          this.posts = data;
          if (this.posts.length > 0) {
            this.userId = this.posts[0].userId;
            this.userNickname = this.posts[0].userNickname;
            this.userImage = this.posts[0].userImage;
            this.isLoading = false;
          }
        })
      );
    });
  }

  createPost() {
    let newPost: IPost = {
      userId: this.localUser.userId,
      userNickname: this.localUser.nickname,
      userImage: this.localUser.image,
      content: this.value,
      creationDate: new Date(),
    };

    this.posts.unshift(newPost);

    this.subscriptions.add(this.socialService.createPost(newPost).subscribe(
      (data) => this.posts = data
    ));
  }

  reloadPosts(post: IPost){
    this.posts = this.posts.filter(p => p !== post);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
