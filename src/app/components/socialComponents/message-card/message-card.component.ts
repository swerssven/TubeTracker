import { Component, Input } from '@angular/core';
import { IMessage } from 'src/app/interfaces/i-message';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent {

  @Input() message!: IMessage;
  @Input() sender!: any;

  constructor(public utils: UtilsServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.sender)
  }
}
