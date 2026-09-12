import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlTableComponent } from './table.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlTableComponent],
  imports: [CommonModule],
  exports: [GlTableComponent],
})
export class GlTableModule {}
