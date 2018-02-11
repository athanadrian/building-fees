import { Component, Input } from '@angular/core';
import { Fee } from '../models/fee';

@Component({
  selector: 'fee-card',
  templateUrl: './fee-card.component.html',
  styleUrls: ['./fee-card.component.css']
})
export class FeeCardComponent {

  @Input('fee') fee: Fee;
  @Input('show-actions') showActions: boolean = true;

  constructor() { }


}
