import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMessage, IMessageDto } from 'src/app/interfaces/i-message';
import { SocialServiceService } from 'src/app/services/social-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  messages!: IMessage[];
  receiverId!: number;
  sender!: any;
  receiverImage!: string;
  receiverName!: string;
  dateAux!: Date;
  messageForm: FormGroup = this.formBuilder.group({
    message: ['', Validators.required],
  });

  constructor(
    public route: ActivatedRoute,
    private socialService: SocialServiceService,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public utils: UtilsServiceService
  ) {}

  ngOnInit(): void {
    this.receiverId = +this.route.snapshot.paramMap.get('id')!;

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.sender = userString ? JSON.parse(userString) : null;
    }

    this.socialService
      .getMessagesList(this.sender.userId, this.receiverId)
      .subscribe((data) => {
        this.messages = data.messagesList;
        this.receiverImage = data.receiverImage;
        this.receiverName = data.receiverName;
      });
  }

  // Method for showing date in messages.
  messageDates(date: Date): boolean {
    if (
      this.dateAux == null || this.dateAux == undefined ||
      this.datepipe.transform(date, 'dd/MM/yyyy') !=
      this.datepipe.transform(this.dateAux, 'dd/MM/yyyy')
    ) {
      this.dateAux = date;
      return true;
    } else {
      return false;
    }
  }

  // Method to send new message
  sendMessage(){
    const newMessage: IMessage = {
      senderUserId: this.sender.userId,
      receiverUserId: this.receiverId,
      content: this.messageForm.value.message,
      creationDate: new Date
    };

    this.socialService.createMessage(newMessage).subscribe(
      () => {
        this.messages.push(newMessage);
      }
    );

    this.messageForm.reset();
  }
}
