import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class GlFormComponent {
  @Input() label = '';
  @Input() helper = '';
  @Input() error: string | null = null;
  @Input() optional = false;

  get invalid(): boolean {
    return !!this.error;
  }
}
