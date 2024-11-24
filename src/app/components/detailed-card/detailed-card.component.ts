import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class DetailedCardComponent implements OnChanges {
  @Input({ required: true }) detailedDrink!: ApiDrink;

  ngOnChanges({ detailedDrink }: SimpleChanges): void {
    if (detailedDrink) {
      this.ingredients = [
        this.detailedDrink.strIngredient1,
        this.detailedDrink.strIngredient2,
        this.detailedDrink.strIngredient3,
        this.detailedDrink.strIngredient5,
        this.detailedDrink.strIngredient6,
        this.detailedDrink.strIngredient7,
        this.detailedDrink.strIngredient8,
        this.detailedDrink.strIngredient9,
        this.detailedDrink.strIngredient10,
        this.detailedDrink.strIngredient11,
        this.detailedDrink.strIngredient12,
        this.detailedDrink.strIngredient13,
        this.detailedDrink.strIngredient14,
        this.detailedDrink.strIngredient15,
      ].filter((ingredient) => ingredient !== null);
    }
  }

  public ingredients: (string | null)[] = [];
}
