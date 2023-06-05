import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IMessage } from 'src/app/interfaces/i-message';
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
    public sanitizer: DomSanitizer
  ) {}
}
