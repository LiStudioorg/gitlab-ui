import { Component, EventEmitter, Input, Output } from '@angular/core';

// Pajamas-inspired (MIT)
@Component({
  selector: 'gl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class GlTableComponent {
  @Input() items: Array<Record<string, unknown>> = [];
  @Input() fields: Array<{ key: string; label: string; sortable?: boolean }> = [];
  @Input() loading = false;
  @Input() sortBy: string | null = null;
  @Input() sortDesc = false;
  @Output() glSort = new EventEmitter<{ sortBy: string | null; sortDesc: boolean }>();

  onSort(field: { key: string; sortable?: boolean }): void {
    if (!field.sortable || this.loading) {
      return;
    }
    if (this.sortBy === field.key) {
      this.sortDesc = !this.sortDesc;
    } else {
      this.sortBy = field.key;
      this.sortDesc = false;
    }
    this.glSort.emit({ sortBy: this.sortBy, sortDesc: this.sortDesc });
  }

  arrow(field: { key: string; sortable?: boolean }): string {
    if (!field.sortable || field.key !== this.sortBy) {
      return '';
    }
    return this.sortDesc ? '↓' : '↑';
  }

  sortedItems(): Array<Record<string, unknown>> {
    if (!this.sortBy) {
      return this.items;
    }
    const key = this.sortBy;
    const dir = this.sortDesc ? -1 : 1;
    return [...this.items].sort((a, b) => {
      const av = String(a ? a[key] : '').toLowerCase();
      const bv = String(b ? b[key] : '').toLowerCase();
      return av < bv ? -dir : av > bv ? dir : 0;
    });
  }

  cell(row: Record<string, unknown>, col: { key: string }): string {
    return row ? String(row[col.key] ?? '') : '';
  }
}
