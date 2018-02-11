import { Component, Input } from '@angular/core';
import { Resident } from '../models/resident';

@Component({
  selector: 'resident-card',
  templateUrl: './resident-card.component.html',
  styleUrls: ['./resident-card.component.css']
})
export class ResidentCardComponent {

  @Input('resident') resident: Resident;

  constructor() { }

}
