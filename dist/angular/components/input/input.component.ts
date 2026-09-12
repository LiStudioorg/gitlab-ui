import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})

export class GlInputComponent {
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time' = 'text';
  @Input() placeholder = '';
  @Input() state: 'valid' | 'invalid' | null = null;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null = null;
  @Input() value = '';
  @Output() glChange = new EventEmitter<string>();
  @Output() glInput = new EventEmitter<string>();

  get widthClass(): string {
    return this.width ? 'gl-form-input-' + this.width : '';
  }

  onValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.glInput.emit(this.value);
    this.glChange.emit(this.value);
  }
}
