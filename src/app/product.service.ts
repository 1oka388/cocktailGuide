import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';


  constructor(private http: HttpClient) {}


  searchProducts(letter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?f=${letter}`);
  }
  searchCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list.php?c=list`);
  }

}
