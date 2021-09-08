import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../model/news';
import {Category} from '../model/category';
import {environment} from '../../environments/environment';
import {TokenStorageService} from './auth/token-storage.service';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  httpOptions: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAll(): Observable<News[]> {
    return  this.http.get<News[]>(API_URL + '/news');
  }
  getAllCategory(): Observable<Category[]> {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        // TODO: Do stuff with data
      });
    return  this.http.get<Category[]>(API_URL + '/news/category');
  }
  getCategoryById(id): Observable<Category> {
    return  this.http.get<Category>(`${API_URL}/news/category/${id}`);
  }
  getById(id): Observable<News> {
    return  this.http.get<News>(`${API_URL}/news/${id}`);
  }
  create(value): Observable<News> {
    return  this.http.post<News>(API_URL + '/news', value);
  }
  update(value, id) {
    console.log(value);
    return  this.http.put<News>(`${API_URL}/news/${id}`, value);
  }
  remove(id) {
    return this.http.delete<News[]>(`${API_URL}/news/${id}`);
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}
