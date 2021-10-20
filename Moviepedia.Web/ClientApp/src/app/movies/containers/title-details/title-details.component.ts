import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '../../models/title.model';
import { MovieDbApiService } from '../../services/moviedb-api.service';
import { TitleService } from '../../services/titles.service';

@Component({
  selector: 'app-title-details',
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.scss']
})
export class TitleDetailsComponent implements OnInit {
  titleInfo: Title;
  movieInfo: any;
  moviePosterUrl: string;
  constructor(private route: ActivatedRoute,
    private titlesService: TitleService,
    private moviedbApiService: MovieDbApiService) { }

  ngOnInit() {
    const titleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(titleId);
  }

  async loadData(titleId: number) {
    this.titleInfo = await this.titlesService.getTitleById(titleId);
    this.movieInfo = await this.moviedbApiService.getMovieInfo(this.titleInfo.titleName);
    if (this.movieInfo && this.movieInfo.results[0] && this.movieInfo.results[0].poster_path) {
      this.moviePosterUrl = environment.imageBaseUrl + this.movieInfo.results[0].poster_path;
      this.getCastPictures(this.movieInfo.results[0].id);
    }
  }

  async getCastPictures(movieId: number) {
    let castInfoFromApi: any[] = [];
    const movieCreditInfo = await this.moviedbApiService.getMovieCreditInfo(movieId);
    this.titleInfo.mainParticipants.topCast.forEach((cast) => {
      castInfoFromApi.push(movieCreditInfo.cast.filter(c => c.original_name.toLowerCase() === cast.participant.name.toLowerCase()));
    });

    if (castInfoFromApi.length > 0) {
      castInfoFromApi.forEach((person) => {
        if (person && person.length > 0) {
          this.moviedbApiService.getPersonInfo(person[0].id)
          .subscribe((topCastInfo: any) => {
              this.titleInfo.mainParticipants.topCast.forEach((cast, i) => {
                if (cast.participant.name.toLowerCase() === topCastInfo.name.toLowerCase()) {
                  this.titleInfo.mainParticipants.topCast[i].pictureUrl =
                    environment.imageBaseUrl + topCastInfo.profile_path;
                }
              });
          });
        }
      });
    }
  }


}
