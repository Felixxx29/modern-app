import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { ApiDrink } from 'src/app/interfaces/api';

@Component({
  selector: 'app-detailed-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonCard],
})
export class DetailedCardComponent {
  @Input({ required: true }) detailedDrink!: ApiDrink;
}
