import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlInputComponent } from './input.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlInputComponent],
  imports: [CommonModule],
  exports: [GlInputComponent],
})
export class GlInputModule {}
