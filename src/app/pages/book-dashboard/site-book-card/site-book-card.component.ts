import { Component } from '@angular/core';

@Component({
  selector: 'ngx-site-book-card',
  templateUrl: './site-book-card.component.html',
  styleUrls: ['./site-book-card.component.scss'],
})
export class SiteBookCardComponent {

  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }

}
