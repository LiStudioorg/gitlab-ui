import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})

export class GlButtonComponent {
  @Input() category: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() variant: 'default' | 'confirm' | 'danger' | 'link' = 'default';
  @Input() size: 'small' | 'medium' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() block = false;
  @Output() glClick = new EventEmitter<MouseEvent>();

  private static readonly COMBO: Record<string, boolean> = {
    'default-primary': true, 'default-tertiary': true,
    'confirm-primary': true, 'confirm-secondary': true, 'confirm-tertiary': true,
    'danger-primary': true, 'danger-secondary': true, 'danger-tertiary': true,
  };

  get isLink(): boolean {
    return this.variant === 'link';
  }

  get tokenCombo(): string {
    const key = this.variant + '-' + this.category;
    return GlButtonComponent.COMBO[key] ? key : 'default-primary';
  }

  get buttonStyle(): Record<string, string> {
    if (this.isLink) {
      const link = cssVar('--gl-button-link-text-color-default');
      return { '--btn-bg': 'transparent', '--btn-fg': link, '--btn-bd': 'transparent', '--btn-bg-h': 'transparent', '--btn-fg-h': link, '--btn-bd-h': 'transparent', '--btn-bg-a': 'transparent', '--btn-fg-a': link, '--btn-bd-a': 'transparent' };
    }
    const t = this.tokenCombo;
    return {
      '--btn-bg': cssVar('--gl-button-' + t + '-background-color-default'),
      '--btn-fg': cssVar('--gl-button-' + t + '-foreground-color-default'),
      '--btn-bd': cssVar('--gl-button-' + t + '-border-color-default'),
      '--btn-bg-h': cssVar('--gl-button-' + t + '-background-color-hover'),
      '--btn-fg-h': cssVar('--gl-button-' + t + '-foreground-color-hover'),
      '--btn-bd-h': cssVar('--gl-button-' + t + '-border-color-hover'),
      '--btn-bg-a': cssVar('--gl-button-' + t + '-background-color-active'),
      '--btn-fg-a': cssVar('--gl-button-' + t + '-foreground-color-active'),
      '--btn-bd-a': cssVar('--gl-button-' + t + '-border-color-active'),
    };
  }

  get classes(): Record<string, boolean> {
    return {
      'gl-button-link': this.isLink,
      'gl-button-sm': this.size === 'small',
      'gl-block': this.block,
      'is-loading': this.loading,
    };
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.glClick.emit(event);
    }
  }
}

function cssVar(name: string): string {
  return 'var(' + name + ')';
}
