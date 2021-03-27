import { NativeModules } from 'react-native';

const { KLAPlatformColors } = NativeModules;

export const resolveColor = KLAPlatformColors.resolveColor;

export const resolveColorSync = KLAPlatformColors.resolveColorSync;
