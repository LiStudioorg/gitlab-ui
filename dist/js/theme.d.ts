export type TokenType = 'color' | 'dimension' | 'number' | 'fontWeight' | 'string';
export interface PajamasTheme {
  [group: string]: { [name: string]: string | number | PajamasTheme } | string | number;
}
export const theme: PajamasTheme;
export const themeDark: PajamasTheme;
export const tokens: Record<string, string | number>;
