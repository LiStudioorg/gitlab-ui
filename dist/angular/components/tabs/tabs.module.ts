import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlTabsComponent } from './tabs.component';

// Pajamas-inspired (MIT)
@NgModule({
  declarations: [GlTabsComponent],
  imports: [CommonModule],
  exports: [GlTabsComponent],
})
export class GlTabsModule {}
