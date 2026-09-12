import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlToastComponent } from './toast.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlToastComponent],
  imports: [CommonModule],
  exports: [GlToastComponent],
})
export class GlToastModule {}
