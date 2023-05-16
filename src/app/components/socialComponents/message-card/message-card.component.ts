import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFriend } from 'src/app/interfaces/i-friend';
import { IMessage } from 'src/app/interfaces/i-message';
import { SocialServiceService } from 'src/app/services/social-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
})
export class MessageCardComponent {
  @Input() message!: IMessage;
  @Input() sender!: any;
  @Input() receiverImage!: string;

  constructor(
    public utils: UtilsServiceService,
    private socialService: SocialServiceService
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {}
}
