import { ColorValue } from 'react-native';

export function resolveColor(color: ColorValue): Promise<string>;

export function resolveColorSync(color: ColorValue): string;
