import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlModalComponent } from './modal.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlModalComponent],
  imports: [CommonModule],
  exports: [GlModalComponent],
})
export class GlModalModule {}
