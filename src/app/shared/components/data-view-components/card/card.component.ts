import { Component } from '@angular/core';
import { Card } from "primeng/card";
import { Button } from "primeng/button";

@Component({
  selector: 'app-card',
  imports: [Card, Button],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
