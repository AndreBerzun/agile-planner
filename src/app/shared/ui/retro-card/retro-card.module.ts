import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetroCardComponent } from './retro-card.component';
import { RetroCardHeaderComponent } from './retro-card-header.component';
import { RetroCardTitleComponent } from './retro-card-title.component';

@NgModule({
  declarations: [
    RetroCardComponent,
    RetroCardHeaderComponent,
    RetroCardTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RetroCardComponent,
    RetroCardHeaderComponent,
    RetroCardTitleComponent
  ]
})
export class RetroCardModule {
}
