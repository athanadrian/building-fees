import { Component, Input } from '@angular/core';
import { Residence } from '../models/residence';

@Component({
  selector: 'residence-card',
  templateUrl: './residence-card.component.html',
  styleUrls: ['./residence-card.component.css']
})
export class ResidenceCardComponent {

  @Input('residence') residence: Residence;

  constructor() { }

}
