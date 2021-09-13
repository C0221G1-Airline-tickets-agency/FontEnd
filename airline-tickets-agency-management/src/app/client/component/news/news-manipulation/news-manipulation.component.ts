import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {Employee} from '../../../../model/employee';
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
  employee: Employee = {
    employeeId: 1,
    employeeName: 'Hoàng'
  };
  news: News = {
    newsCode: '',
    newsTitle: '',
    newsContent: '',
    newsWriteDay: '',
    category: {
      categoryId: ''
    }
  };
  formNews: FormGroup;
  categorys: Category[] = [];
  typeComponent = 'create';
  checkCategoryInList = false;
  checkCategoryInvalid = false;
  checkImage = false;
  done = false;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFileService) private uploadFileService: UploadFileService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private newsService: NewsService,
              private toastr: ToastrService,
              private el: ElementRef) {
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


  get newsId() {
    return this.formNews.get('newsId');
  }

  getListCategory() {
    this.newsService.getAllCategory().subscribe(value => {
      this.categorys = value;
    });
  }

  showPreview(event: any) {
    this.checkImage = true;
    const file = event.target.files[0];
    const fileType = file.type;
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(fileType)) {
      this.selectedImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        this.getImage();
      }
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
      newsCode: [newsCode, [Validators.pattern(`^${newsCode}$`)]],
      newsTitle: ['', [Validators.required, Validators.minLength(66), Validators.maxLength(120)]],
      newsImage: ['', []],
      newsImageName: ['', [Validators.required]],
      newsContent: ['', [Validators.required, Validators.minLength(666), Validators.maxLength(120000)]],
      newsWriteDay: [newsWriteDay, [Validators.pattern(`^${newsWriteDay}$`)]],
      NewsViews: [0, []],
      flag: [true, []],
      employee: [this.employee],
      category: this.fb.group({
        categoryId: ['', [Validators.required]],
        categoryName: ['']
      })
    });
  }

  save() {
    if (this.checkValidate()) {
      if (this.checkEditForm() && this.selectedImage === null) {
        Swal.fire(
          'Bạn chưa thực hiện sự thay đổi nào !',
          'Bạn có muốn tiếp tục?',
          'question'
        );
      } else {
        Swal.fire({
          title: 'Thao tác sẽ lưu dữ liệu ?',
          text: 'Bạn muốn gửi dữ liệu',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK, gửi dữ liệu!',
          cancelButtonText: 'Không, tiếp tục chỉnh sửa!'
        }).then((result) => {
          if (result.isConfirmed) {
            const t = Swal.fire({
              title: 'Đang gửi dữ liệu',
              text: 'Vui lòng chờ ...',
              imageUrl: '../../../../../assets/img/spin.gif',
              showConfirmButton: false,
            });
            const name = this.newsImageName.value;
            const fileRef = this.storage.ref(name);
            if (this.selectedImage !== null) {
              this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe((url) => {
                      this.url = url;
                      this.newsImage.setValue(url);
                      this.manipulationNews();
                    }
                  );
                })
              ).subscribe();
            } else {
              this.manipulationNews();
            }
          }
        });
      }
    } else {
      for (const key of Object.keys(this.formNews.controls)) {
        if (this.formNews.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
    }
  }

  checkEditForm() {
    return this.news.newsContent === this.newsContent.value &&
      this.newsTitle.value === this.news.newsTitle &&
      this.category.get('categoryId').value === this.news.category.categoryId;
  }

  manipulationNews() {
    this.news = this.formNews.value;
    this.news.newsContent = this.newsContent.value.replace(/\n\r?/g, '<br />');
    this.news.newsTitle = this.newsTitle.value.replace(/\n\r?/g, '<br />');
    if (this.typeComponent === 'create') {
      this.newsService.create(this.news).subscribe(value => {
        this.router.navigateByUrl('news/news-list').then(() => {
          this.toastr.success('Tạo mới bài viết thành công', 'Thành công');
        });
      }, error => {
        this.alertError('Có lỗi hệ thống');
      }, () => Swal.close());
    } else {
      this.newsService.update(this.news, this.news.newsId).subscribe(value => {
        this.router.navigateByUrl('news/news-list').then(() => {
          this.toastr.success('Chỉnh sửa bài viết thành công', 'Thành công');
        });
      }, error => {
        this.alertError('Có lỗi hệ thống');
      }, () => Swal.close());
    }
  }

  checkValidate(): boolean {
    if (!this.checkNameEmployee()) {
      this.alertError('Bạn đã chỉnh sửa tên người viết');
      return false;
    }
    if (!this.checkCodeFeedNews()) {
      this.alertError('Bạn đã chỉnh sửa mã bài viết');
      return false;
    }
    if (!this.checkNewsWriteDay()) {
      this.alertError('Bạn đã chỉnh sửa ngày viết');
      return false;
    }
    if (this.category.invalid) {
      this.alertError('Thể loại không hợp lệ');
      return false;
    }
    if (this.newsImageName.invalid) {
      this.alertError('Hình ảnh không hợp lệ');
      return false;
    }
    if (this.newsContent.invalid) {
      this.alertError('Nội dung không hợp lệ');
      return false;
    }

    if (this.newsTitle.invalid) {
      this.alertError('Tiêu đề không hợp lệ');
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
    this.checkCategoryInList = false;
    this.checkCategoryInvalid = false;
    if (event.target.value !== '') {
      const category = this.categorys.find(({categoryId}) => Number(categoryId) === Number(event.target.value));
      if (typeof category !== 'undefined') {
        this.category.setValue(category);
      } else {
        this.checkCategoryInList = true;
      }
    } else {
      this.checkCategoryInvalid = true;
      const category = document.getElementById('category');
      category.classList.replace('is-valid', 'is-invalid');
      this.category.setValue({
        categoryId: null,
        categoryName: null
      });
    }
  }

  previewNews() {
    const data = this.formNews.value;
    data.newsContent = this.newsContent.value.replace(/\n\r?/g, '<br />');
    data.newsTitle = this.newsTitle.value.replace(/\n\r?/g, '<br />');
    const dialogRef = this.dialog.open(NewsReviewComponent, {
      width: '750px',
      autoFocus: false,
      maxHeight: '90vh',
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

          this.typeComponent = 'edit';
          this.news = news;
          this.newsCode.setValidators(Validators.pattern(`^${news.newsCode}$`));
          this.newsWriteDay.setValidators(Validators.pattern(`^${news.newsWriteDay}$`));
          this.newsId.setValue(news.newsId);
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

  checkCategory(categoryId) {
    return categoryId === this.category.get('categoryId').value;
  }

  checkNameEmployee() {
    return this.employee.employeeName === (document.getElementById('nameEmployee') as HTMLInputElement).value;
  }

  checkCodeFeedNews() {
    return this.formNews.get('newsCode').valid;
  }

  checkNewsWriteDay() {
    return this.formNews.get('newsWriteDay').valid;
  }

  back() {
    if (!this.checkEditForm() && this.done === false) {
      Swal.fire({
        title: 'Quay về trang danh sách',
        text: 'Mọi thay đổi sẽ không được lưu lại!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Về trang chủ',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('news/news-list').then(() => {
          });
        }
      });
    } else {
      this.router.navigateByUrl('news/news-list').then(() => {
      });
    }
  }
}
