import {Component, OnInit, Pipe} from '@angular/core';
import {News} from '../../../../model/news';
import {NewsService} from '../../../../service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

  pages: Array<any> = [];
  page = 0;
  newsList: News[] = [];
  hotNews: News[] = [];
  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getAllNews();
    this.getHotNews();
  }
  getAllNews() {
    this.newsService.getAllNews(this.page).subscribe(newsList => {
      if (!newsList) {
        this.newsList = [];
      }
      this.newsList = newsList.content;
      // this.pipe.transform('10',)
      this.pages = new Array<any>(newsList.totalPages);
      console.log(this.newsList);
    });
  }

  setPage(i: number) {
    this.page = i;
    this.getAllNews();

  }

  previous() {
    if (this.page === 0) {
      this.page = 0;
    } else {
      this.page = this.page - 1;
      this.getAllNews();
    }
  }

  next() {
    if (this.page > this.pages.length - 1) {
      this.page = this.pages.length - 1;
    } else {
      this.page = this.page + 1;
      this.getAllNews();
    }
  }

  getHotNews() {
    this.newsService.getHotNews().subscribe(hotNews => {
      if (!hotNews) {
        this.hotNews = [];
      }
      this.hotNews = hotNews;
      console.log('this.hotNews');
      console.log(this.hotNews);
    });
  }
}
