//  Pajamas-inspired design tokens (MIT)
//  Generated from @gitlab/ui by scripts/build-tokens.js. Do not edit.

// Material UI (MUI) 主题映射。
// 用法：import { createTheme } from '@mui/material/styles'; const theme = pajamasMui;
import { createTheme } from '@mui/material/styles';

export const pajamasMui = createTheme({
  palette: {
    primary: { main: '#1f75cb', light: '#63a6e9', dark: '#2f5ca0' },
    success: { main: '#108548' },
    warning: { main: '#ab6100' },
    error: { main: '#dd2b0e' },
    info: { main: '#428fdc' },
    text: { primary: '#3a383d', secondary: '#747273' },
    background: { default: '#fff', paper: '#fff' },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 14 },
});
