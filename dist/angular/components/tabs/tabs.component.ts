import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})

export class GlTabsComponent {
  @Input() tabs: Array<{ title: string; count?: number; content?: string }> = [];
  @Input() active = 0;
  @Output() glChange = new EventEmitter<number>();

  select(index: number): void {
    if (index === this.active) {
      return;
    }
    this.active = index;
    this.glChange.emit(index);
  }
}
