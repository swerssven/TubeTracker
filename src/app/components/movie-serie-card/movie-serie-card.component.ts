import { Component, Input } from '@angular/core';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';
import { MovieServiceService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-serie-card.component.html',
  styleUrls: ['./movie-serie-card.component.scss']
})
export class MovieSerieCardComponent {
  @Input() movie_serie!: any;
  @Input() type!: string;
  date!: Date;
  user!: any;

  constructor(private movieService: MovieServiceService){}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    if(this.type == "movies"){
      this.date = new Date(this.movie_serie.release_date);
    }else if(this.type == "series"){
      this.date = new Date(this.movie_serie.first_air_date);
    }
  }

  markWatched(){
    if(this.type == "movies"){
      let watched = this.movie_serie.watched ? false : true;
      this.movieService.setMovieWatched(this.movie_serie.id, this.user.userId, this.user.language, watched).subscribe(
        (data) => {this.movie_serie.watched = data;}
      )
    }else if(this.type == "series"){
      let watched = this.movie_serie.watched ? false : true;
      // api mark watched
    }
  }
}
