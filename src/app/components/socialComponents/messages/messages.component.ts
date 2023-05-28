import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMessage, IMessageDto } from 'src/app/interfaces/i-message';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SocialServiceService } from 'src/app/services/social-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  isLoadingMessages: boolean = false;
  messages!: IMessage[];
  receiverId!: number;
  sender!: any;
  receiverImage!: string;
  receiverName!: string;
  dateAux!: Date;
  messageForm: FormGroup = this.formBuilder.group({
    message: ['', Validators.required],
  });
  private subscriptions: Subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    private socialService: SocialServiceService,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public utils: UtilsServiceService,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.isLoadingMessages = true;
    this.receiverId = +this.route.snapshot.paramMap.get('id')!;

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.sender = userString ? JSON.parse(userString) : null;
    }

    this.subscriptions.add(this.socialService
        .getMessagesList(this.sender.userId, this.receiverId)
        .subscribe((data) => {
          this.messages = data.messagesList;
          this.receiverImage = data.receiverImage;
          this.receiverName = data.receiverName;
          this.subscriptions.add(this.socialService.getNumberUnreadMessages(this.sender.userId).subscribe(
            (data) => {
              this.dataService.setData(data);
              this.isLoadingMessages = false;
            }
          ))
      }));
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

    this.subscriptions.add(this.socialService.createMessage(newMessage).subscribe(
      () => {
        this.messages.push(newMessage)
      }
    ));

    this.messageForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
