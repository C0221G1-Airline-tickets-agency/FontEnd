import {Component, OnInit, Pipe} from '@angular/core';
import {News} from '../../../../model/news';
import {NewsService} from '../../../../service/news.service';
import Swal from 'sweetalert2';

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
  news: News = {};
  newsIdChoice = 0;
  newsNameChoice = '';


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
      this.pages = new Array<any>(newsList.totalPages);

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
    });
  }

  addViews(id: number) {
    this.newsService.updateViews(id).subscribe(() => {
    });
  }

  deleteNews(newsId, newsName) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      html: '<span style="color: #dc3545">' + 'Tin tức có id : ' + newsId  + '<br>' + ' Tin tức có mã : ' + newsName + '</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: '&emsp;Huỷ&emsp;',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.newsService.deleteNews(newsId).subscribe(e => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xoá thành công',
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllNews();
          }, error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Lỗi',
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllNews();
          }
        );
      }
    });
  }
}
