import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HostListener } from '@angular/core';
// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class GlModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() primaryAction: { text: string; variant?: string } | null = null;
  @Input() secondaryAction: { text: string } | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() glPrimary = new EventEmitter<void>();
  @Output() glSecondary = new EventEmitter<void>();

  get classes(): Record<string, boolean> {
    return {
      'gl-modal-sm': this.size === 'sm',
      'gl-modal-md': this.size === 'md',
      'gl-modal-lg': this.size === 'lg',
    };
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.visible) {
      this.onClose();
    }
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.visible = false;
    this.close.emit();
  }

  onPrimary(): void {
    this.glPrimary.emit();
  }

  onSecondary(): void {
    this.glSecondary.emit();
    this.onClose();
  }
}
