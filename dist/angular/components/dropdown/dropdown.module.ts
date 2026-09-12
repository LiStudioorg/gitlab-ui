import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlDropdownComponent } from './dropdown.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlDropdownComponent],
  imports: [CommonModule],
  exports: [GlDropdownComponent],
})
export class GlDropdownModule {}
