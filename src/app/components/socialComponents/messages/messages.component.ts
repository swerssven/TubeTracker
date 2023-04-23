import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/app/interfaces/i-message';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messages!: IMessage[];
  receiverId!: number;
  sender!: any;

constructor( public route: ActivatedRoute, private socialService: SocialServiceService){}

  ngOnInit(): void {
    this.receiverId = +this.route.snapshot.paramMap.get('id')!;

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.sender = userString ? JSON.parse(userString) : null;
    }

    this.socialService.getMessagesList(this.sender.userId, this.receiverId).subscribe(
      (data) => {this.messages = data;
      console.log(data)}
    )
  }
}
