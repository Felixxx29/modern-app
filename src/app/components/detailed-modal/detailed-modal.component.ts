import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { CoctailService } from 'src/app/services';
import {
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/angular/standalone';
import { DetailedCardComponent } from '../detailed-card/detailed-card.component';
import { ApiDrink } from 'src/app/interfaces/api';

@Component({
  selector: 'app-detailed-modal',
  templateUrl: './detailed-modal.component.html',
  styleUrls: ['./detailed-modal.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonModal,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    DetailedCardComponent,
  ],
})
export class DetailedModalComponent {
  @ViewChild(IonModal) modal?: IonModal;
  @Input({ required: true }) trigger!: string;
  @Output() closeEvent = new EventEmitter();

  private coctailService = inject(CoctailService);

  public isLoading = false;
  public detailedDrink?: ApiDrink;

  constructor() {
    this.loadRandom();
  }

  public close(): void {
    this.modal?.dismiss(null);
  }

  private loadRandom(): void {
    this.isLoading = true;
    this.coctailService
      .getRandomCoctail()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: any) => {
          //error handling logic
          return of(null);
        })
      )
      .subscribe((response) => {
        if (!response) return;
        this.detailedDrink = Array.isArray(response?.drinks)
          ? response.drinks[0]
          : undefined;
      });
  }
}
