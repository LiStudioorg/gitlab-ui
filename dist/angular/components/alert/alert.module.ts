import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlAlertComponent } from './alert.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlAlertComponent],
  imports: [CommonModule],
  exports: [GlAlertComponent],
})
export class GlAlertModule {}
