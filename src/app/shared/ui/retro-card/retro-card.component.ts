import { Component } from '@angular/core';

@Component({
  selector: 'retro-card',
  styleUrl: './retro-card.component.scss',
  standalone: false,
  template: `
    <div class="retro-card">
      <ng-content></ng-content>
    </div>
  `
})
export class RetroCardComponent {

}
