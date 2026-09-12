import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlButtonComponent } from './button.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlButtonComponent],
  imports: [CommonModule],
  exports: [GlButtonComponent],
})
export class GlButtonModule {}
