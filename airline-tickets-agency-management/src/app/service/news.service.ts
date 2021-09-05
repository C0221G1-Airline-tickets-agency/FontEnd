import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../model/news';
import {Category} from '../model/category';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(private http: HttpClient) { }
  getAll(): Observable<News[]> {
    return  this.http.get<News[]>(API_URL + '/news');
  }
  getAllCategory(): Observable<Category[]> {
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
    return  this.http.put<News[]>(`${API_URL}/news/${id}`, value);
  }
  remove(id) {
    return this.http.delete<News[]>(`${API_URL}/news/${id}`);
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}
