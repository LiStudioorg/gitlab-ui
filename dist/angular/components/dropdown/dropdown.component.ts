import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})

export interface GlDropdownItem {
  id: string | number;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  header?: boolean;
  divider?: boolean;
}

export class GlDropdownComponent {
  @Input() text = '';
  @Input() items: GlDropdownItem[] = [];
  @Input() showClearAll = false;
  @Input() disabled = false;
  @Output() glSelect = new EventEmitter<GlDropdownItem>();
  @Output() glClearAll = new EventEmitter<void>();

  open = false;

  toggle(): void {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  close(): void {
    this.open = false;
  }

  onSelect(item: GlDropdownItem): void {
    if (item.disabled || item.header || item.divider) {
      return;
    }
    this.glSelect.emit(item);
    this.close();
  }

  clearAll(): void {
    this.glClearAll.emit();
    this.close();
  }
}
