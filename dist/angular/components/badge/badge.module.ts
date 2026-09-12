import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlBadgeComponent } from './badge.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlBadgeComponent],
  imports: [CommonModule],
  exports: [GlBadgeComponent],
})
export class GlBadgeModule {}
