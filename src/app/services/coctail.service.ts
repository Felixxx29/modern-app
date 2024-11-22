import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCoctail, ApiDetailedCoctail } from '../interfaces/api';
import { environment } from 'src/environments/environment';

const BACE_URL = 'https://www.thecocktaildb.com/api/json/v1';

@Injectable({
  providedIn: 'root',
})
export class CoctailService {
  private http = inject(HttpClient);

  public getByNameCoctail(name: string): Observable<ApiCoctail> {
    const url = `${BACE_URL}/${environment.apiKey}/search.php?s=${name}`;
    return this.http.get<ApiCoctail>(url);
  }

  public getRandomCoctail(): Observable<ApiCoctail> {
    const url = `${BACE_URL}/${environment.apiKey}/random.php`;
    return this.http.get<ApiCoctail>(url);
  }

  public getDetailedCoctail(id: string): Observable<ApiDetailedCoctail> {
    const url = `${BACE_URL}/${environment.apiKey}/lookup.php?i=${id}`;
    return this.http.get<ApiDetailedCoctail>(url);
  }
}
