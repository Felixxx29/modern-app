import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { shuffleOutline, searchOutline } from 'ionicons/icons';
import { CoctailService } from '../../services';
import { CardComponent } from '../../components/card/card.component';
import { ApiDrink } from '../../interfaces/api';
import { FormsModule } from '@angular/forms';
import { catchError, finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { DetailedModalComponent } from '../../components/detailed-modal/detailed-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonSearchbar,
    IonButton,
    IonButtons,
    IonIcon,
    CardComponent,
    FormsModule,
    RouterLink,
    DetailedModalComponent,
  ],
})
export class HomePage {
  private coctailService = inject(CoctailService);
  private router = inject(Router);

  public isLoading = false;
  public error = null;
  public drinks: ApiDrink[] = [];
  public searchModel = 'margarita';

  constructor() {
    addIcons({ shuffleOutline, searchOutline });
  }

  public search(drinkName: string): void {
    this.isLoading = true;
    this.coctailService
      .getByNameCoctail(drinkName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: any) => {
          //error handling logic
          return [];
        })
      )
      .subscribe((response) => {
        this.drinks = Array.isArray(response.drinks) ? response.drinks : [];
      });
  }

  public onDrinkClick(drink: ApiDrink): void {
    this.router.navigate([drink.idDrink]);
  }
}
