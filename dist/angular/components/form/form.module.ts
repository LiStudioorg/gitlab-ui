import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlFormComponent } from './form.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlFormComponent],
  imports: [CommonModule],
  exports: [GlFormComponent],
})
export class GlFormModule {}
