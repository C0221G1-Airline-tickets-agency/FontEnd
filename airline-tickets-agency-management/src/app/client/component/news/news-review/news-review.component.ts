
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {News} from '../../../../model/news';


@Component({
  selector: 'app-news-review',
  templateUrl: './news-review.component.html',
  styleUrls: ['./news-review.component.css']
})
export class NewsReviewComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<NewsReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News) { }


  ngOnInit(): void {
    this.getContent();
  }
  getContent() {
    document.getElementById('content').innerHTML = this.data.newsContent.toString();
    console.log(this.data.newsContent);

  }
}
