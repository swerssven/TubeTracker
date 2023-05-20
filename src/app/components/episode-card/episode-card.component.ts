import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEpisode } from 'src/app/interfaces/i-season-episode';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss']
})
export class EpisodeCardComponent {
  @Input() episode!: IEpisode;
  @Output() checkWatchedEpisodeParent = new EventEmitter<IEpisode>();
  user!: any;
  private subscriptions: Subscription = new Subscription();

constructor(private serieService: SerieServiceService){}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  markWatched() {
    let watched = this.episode.watched ? false : true;
    this.subscriptions.add(this.serieService
      .setSeasonEpisodeWatched(
        this.episode.serieApiId,
        this.episode.seasonsEpisodesId,
        this.user.userId,
        watched
      )
      .subscribe((data) => {
        this.episode.watched = data;
        this.checkWatchedEpisodeParent.emit(this.episode);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
