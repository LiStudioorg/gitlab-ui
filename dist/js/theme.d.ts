export type TokenType = 'color' | 'dimension' | 'number' | 'fontWeight' | 'string';
export interface GitLabTheme {
  [group: string]: { [name: string]: string | number | GitLabTheme } | string | number;
}
export const theme: GitLabTheme;
export const themeDark: GitLabTheme;
export const tokens: Record<string, string | number>;
