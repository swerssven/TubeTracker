import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IPost } from 'src/app/interfaces/i-post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: IPost;

  constructor(public sanitizer: DomSanitizer){}
}
