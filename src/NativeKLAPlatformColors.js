// @flow
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  resolveColor(color: {||}): Promise<string>;
  resolveColorSync(color: {||}): string;
}
export default (TurboModuleRegistry.get<Spec>('KLAPlatformColors'): ?Spec);
