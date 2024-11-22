import { Component, inject } from '@angular/core';
import { CoctailService } from '../../services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent, IonTitle } from '@ionic/angular/standalone';
import { ApiDetailedDrink } from '../../interfaces/api';

@Component({
  selector: 'app-detailed-drink',
  templateUrl: './detailed-drink.component.html',
  styleUrls: ['./detailed-drink.component.scss'],
  standalone: true,
  imports: [IonTitle, 
    IonCardContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    RouterLink,
  ],
  providers: [CoctailService],
})
export class DetailedDrinkComponent {
  private coctailService = inject(CoctailService);
  private route = inject(ActivatedRoute);
  public isLoading = false;
  public detailedDrink?: ApiDetailedDrink;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loadCoctail(id);
  }

  private loadCoctail(id: string): void {
    this.isLoading = true;
    this.coctailService
      .getDetailedCoctail(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: any) => {
          //error handling logic
          return of(null);
        })
      )
      .subscribe((coctail) => {
        this.detailedDrink = coctail?.drinks[0] || undefined;
      });
  }
}
