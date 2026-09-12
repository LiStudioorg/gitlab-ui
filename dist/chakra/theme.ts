//  GitLab Pajamas design tokens (MIT)
//  Generated from @gitlab/ui by scripts/build-tokens.js. Do not edit.

// Chakra UI 主题映射。
// 用法：import { extendTheme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

export const pajamasChakra = extendTheme({
  colors: {
    brand: { 500: '#1f75cb', 400: '#428fdc', 600: '#2f68b4' },
    success: '#108548', warning: '#ab6100', danger: '#dd2b0e',
  },
  fonts: { body: 'GitLab Sans, Inter, sans-serif', heading: 'GitLab Sans, Inter, sans-serif', mono: 'GitLab Mono, monospace' },
  radii: { xs: '1px', sm: '2px', md: '4px', lg: '8px', xl: '12px' },
  space: { '4': '12px', '5': '16px', '6': '24px', '8': '32px' },
});
