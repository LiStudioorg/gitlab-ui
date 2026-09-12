import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})

export class GlToastComponent implements OnInit, OnDestroy {
  @Input() message = '';
  @Input() action: { text: string; onClick?: () => void } | null = null;
  @Input() autoHideDelay = 5000;
  @Output() glDismiss = new EventEmitter<void>();

  visible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.visible = true;
    this.timer = setTimeout(() => this.dismiss(), Math.max(this.autoHideDelay, 1000));
  }

  onAction(): void {
    this.action?.onClick?.();
  }

  dismiss(): void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.glDismiss.emit();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
