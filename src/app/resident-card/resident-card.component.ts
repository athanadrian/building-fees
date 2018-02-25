import { Component, Input } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'resident-card',
  templateUrl: './resident-card.component.html',
  styleUrls: ['./resident-card.component.css']
})
export class ResidentCardComponent {

  @Input('resident') resident: AppUser;

  constructor() { }

}
