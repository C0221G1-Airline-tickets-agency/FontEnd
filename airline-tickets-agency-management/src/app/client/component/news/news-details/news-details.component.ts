import {Component, OnInit} from '@angular/core';
import {News} from '../../../../model/news';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NewsService} from '../../../../service/news.service';
import {Category} from '../../../../model/category';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  item: News = {};
  idDetails = 0;
  hotNews: News[] = [];
  category: Category = {};

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getDetails();
    this.getHotNews();
  }

  getDetails() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idDetails = +paramMap.get('id');
      console.log('this.idDetails');
      console.log(this.idDetails);
      this.newsService.getById(this.idDetails).subscribe(next => {
        this.item = next;
        console.log('next');
        console.log(next);
      });
    });
  }

  getHotNews() {
    this.newsService.getHotNews().subscribe(hotNews => {
      if (!hotNews) {
        this.hotNews = [];
      }
      this.hotNews = hotNews;
    });
  }
}
