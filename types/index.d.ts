import 'styled-components';
import { globalTheme } from '../src/styles/theme/global.theme';

declare module "*.jpg";
declare module "*.png";

type GlobalTheme = typeof globalTheme

declare module 'styled-components' {
    export interface DefaultTheme extends GlobalTheme { }
}