import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})

export class GlAlertComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'danger' | 'tip' = 'info';
  @Input() title = '';
  @Input() dismissible = true;
  @Input() sticky = false;
  @Output() glDismiss = new EventEmitter<void>();

  visible = true;

  get classes(): Record<string, boolean> {
    return {
      'gl-alert-sticky': this.sticky,
    };
  }

  get role(): string {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  dismiss(): void {
    this.visible = false;
    this.glDismiss.emit();
  }
}
