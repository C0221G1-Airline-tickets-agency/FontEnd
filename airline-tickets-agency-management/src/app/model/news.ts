import {Employee} from './employee';
import {Category} from './category';

export interface News {
  newsId?;
  newsCode?;
  newsTitle?;
  newsImage?;
  newsContent?;
  newsWriteDay?;
  newsViews?;
  flag?;
  employee?: Employee;
  category?: Category;
}
