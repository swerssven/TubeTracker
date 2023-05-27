import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IReview } from 'src/app/interfaces/i-review';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { ShareComponent } from '../socialComponents/share/share.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent {
  @Input() review!: IReview;
  @Input() title!: string;
  @Input() contentId!: number;
  @Input() contentType!: string;

  constructor(public utils: UtilsServiceService,
    private modalService: NgbModal,
    private translate: TranslateService) {}

    share(){
      let reviewFor = this.translate.instant("SOCIAL.REVIEW_FOR");
      const date = new Date(
        this.utils.convertDateLocale(this.review.creationDate!)
      );
      const defAvatar = 'data:image/png;base64,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';
      let content = '<p style="margin-bottom: 25px;"></p><div contenteditable="false" class="card shadow px-sm-3 px-md-3 py-1 p-3 my-0 mx-2 mx-md-5 mx-lg-5">\n <div style="margin: 0px; padding: 0px;">\n <div class="card-header m-0 p-1">\n <div\n class="col-12 d-flex align-items-center justify-content-between px-2"\n >\n <div class="d-flex align-items-center gap-2">\n <a href="/statistics/{{userId}}" class="d-flex gap-3 align-items-center">\n <img\n style="max-height: 30px; border-radius: 50%;"\n src="{{userImage}}"\n alt="{{creatorNickname}}"\n />\n <span>{{creatorNickname}}</span>\n </a>\n \n </div>\n <div>\n <div>{{creationDate}}</div>\n </div>\n </div>\n </div>\n <div class="card-body px-2 my-0 py-0">\n<div class="d-flex align-items-center gap-2">\n<span style="margin-left: 10px;">{{review_for}}</span>\n<a href="/{{type}}/{{typeId}}" class="d-flex gap-3 align-items-center">\n {{title}}\n </a>\n</div>\n <p style="margin-top: 10px;">\n {{content}}\n </p>\n </div>\n </div>\n </div>';
      content = content.replaceAll('{{userId}}', this.review.userId!.toString());
      content = content.replaceAll('{{userImage}}', this.review.userImage ? this.review.userImage : defAvatar);
      content = content.replaceAll('{{review_for}}', reviewFor);
      content = content.replaceAll('{{type}}', this.contentType);
      content = content.replaceAll('{{typeId}}', this.contentId.toString());
      content = content.replaceAll('{{title}}', this.title);
      content = content.replaceAll('{{creatorNickname}}', this.review.userNickname!);
      content = content.replaceAll('{{creationDate}}', date.toLocaleDateString());
      content = content.replaceAll('{{content}}', this.review.content);

      const modalRef = this.modalService.open(ShareComponent, {centered: true, size: 'xl'});
      modalRef.componentInstance.value = content;
    }
}
