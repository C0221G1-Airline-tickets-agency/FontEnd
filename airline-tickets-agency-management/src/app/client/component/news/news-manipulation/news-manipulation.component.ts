import {Component, Inject, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {News} from '../../../../model/news';
import {Category} from '../../../../model/category';
import {NewsService} from '../../../../service/news.service';
import {UploadFileService} from '../../../../service/upload-file.service';
import {NewsReviewComponent} from '../news-review/news-review.component';

@Component({
  selector: 'app-news-manipulation',
  templateUrl: './news-manipulation.component.html',
  styleUrls: ['./news-manipulation.component.css']
})
export class NewsManipulationComponent implements OnInit {
  selectedImage: any = null;
  url: string;
  filePath: string | ArrayBuffer;
  // employee = {
  //   employeeId: 1,
  //   employeeName: 'Hoàng'
  // };
  news: News;
  formNews: FormGroup;
  categorys: Category[] = [];
  typeComponent = 'create';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFileService) private uploadFileService: UploadFileService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private newsService: NewsService) {
  }


  ngOnInit(): void {
    this.initForm();
    this.getNews();
    this.getListCategory();
  }

  get category() {
    return this.formNews.get('category');
  }

  get newsImage() {
    return this.formNews.get('newsImage');
  }

  get newsContent() {
    return this.formNews.get('newsContent');
  }

  get newsTitle() {
    return this.formNews.get('newsTitle');
  }

  get newsImageName() {
    return this.formNews.get('newsImageName');
  }

  get newsCode() {
    return this.formNews.get('newsCode');
  }

  get newsWriteDay() {
    return this.formNews.get('newsWriteDay');
  }

  getListCategory() {
    this.newsService.getAllCategory().subscribe(value => {
      this.categorys = value;
    });
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.getImage();
    }
  }

  getImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage); // read file as data url
    this.newsImageName.setValue(this.selectedImage.name);
    reader.onload = (e) => { // called once readAsDataURL is completed
      this.filePath = e.target.result;
      this.newsImage.setValue(this.filePath);
    };
  }

  initForm() {
    const newsCode = this.randomNumber;
    const newsWriteDay = this.currentDate;
    this.formNews = this.fb.group({
      newsId: ['', []],
      newsCode: [newsCode, []],
      newsTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      newsImage: ['', []],
      newsImageName: ['', [Validators.required]],
      newsContent: ['', [Validators.required]],
      newsWriteDay: [newsWriteDay, []],
      NewsViews: [0, []],
      flag: [true, []],
      // employee: [this.employee],
      category: this.fb.group({
        categoryId: ['', [Validators.required]],
        categoryName: ['']
      })
    });
  }

  save() {
    if (this.checkValidate()) {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.newsImage.setValue(url);
            this.news = this.formNews.value;
            this.newsService.create(this.news).subscribe(
            );
          });
        })
      ).subscribe();
    }
  }

  checkValidate(): boolean {
    if (this.newsContent.invalid) {
      this.alertError('Nội dung không hợp lệ');
      return false;
    }
    return true;
  }

  alertError(reason) {
    const typeComponent = this.typeComponent === 'create' ? 'Tạo mới' : 'Chỉnh sửa';
    Swal.fire({
      icon: 'error',
      title: typeComponent + ' không thành công',
      text: reason,
    });
  }

  get currentDate() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  get randomNumber() {
    return Math.floor(Math.random() * (100000 - 10000 + 1) + 10000);
  }

  changeCategory(event) {
    const category = this.categorys.find(({categoryId}) => Number(categoryId) === Number(event.target.value));
    this.category.setValue(category);
  }

  previewNews() {
    const data = this.formNews.value;
    const dialogRef = this.dialog.open(NewsReviewComponent, {
      width: '750px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getNews(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.newsService.getById(id)
        .subscribe((news) => {
          this.news = news;
          this.newsImage.setValue(news.newsImage);
          this.category.setValue(news.category);
          this.newsTitle.setValue(news.newsTitle);
          this.newsContent.setValue(news.newsContent);
          this.newsCode.setValue(news.newsCode);
          this.newsWriteDay.setValue(news.newsWriteDay);
          const fileRef = this.storage.refFromURL(news.newsImage);
          fileRef.getMetadata().subscribe(value => {
            this.newsImageName.setValue(value.name);
          });
        });
    }
  }
}
