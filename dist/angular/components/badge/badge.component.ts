import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})

export class GlBadgeComponent {
  @Input() variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier' = 'neutral';
  @Input() icon: string | null = null;
  @Input() href: string | null = null;

  get tokenTag(): string {
    return 'gl-badge-' + this.variant;
  }
}
