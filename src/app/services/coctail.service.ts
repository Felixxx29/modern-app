import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCoctail } from '../interfaces/api';

const BACE_URL = 'https://www.thecocktaildb.com/api/json/v1';
const API_KEY = '1';

@Injectable({
  providedIn: 'root',
})
export class CoctailService {
  private http = inject(HttpClient);

  public getByNameCoctail(name: string): Observable<ApiCoctail> {
    const url = `${BACE_URL}/${API_KEY}/search.php?s=${name}`;
    return this.http.get<ApiCoctail>(url);
  }

  public getRandomCoctail(): Observable<ApiCoctail> {
    const url = `${BACE_URL}/${API_KEY}/random.php`;
    return this.http.get<ApiCoctail>(url);
  }

  public getDetailedCoctail(id: string): Observable<ApiCoctail> {
    const url = `${BACE_URL}/${API_KEY}/lookup.php?i=${id}`;
    return this.http.get<ApiCoctail>(url);
  }
}
