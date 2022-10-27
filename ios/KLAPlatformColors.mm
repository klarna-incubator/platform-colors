#import "KLAPlatformColors.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <KLAPlatformColorsSpec/KLAPlatformColorsSpec.h>
#endif

@implementation KLAPlatformColors

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(resolveColorSync:(UIColor *)color)
{
  return [self hexCodeFromColor:color];
}

RCT_EXPORT_METHOD(resolveColor:(UIColor *)color
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([self hexCodeFromColor:color]);
}

- (NSString *) hexCodeFromColor:(UIColor *)color
{
  CGFloat r = 0;
  CGFloat g = 0;
  CGFloat b = 0;
  CGFloat a = 0;
  [color getRed:&r green:&g blue:&b alpha:&a];
  int rgb = (int)(r * 0xFF) << 16 | (int)(g * 0xFF) << 8 | (int)(b * 0xFF) << 0;
  int alpha = a * 0xFF;
  if (alpha == 0xFF) {
    return [NSString stringWithFormat:@"#%06x", rgb];
  } else {
    return [NSString stringWithFormat:@"#%06x%02x", rgb, alpha];
  }
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeKLAPlatformColorsSpecJSI>(params);
}
#endif

@end
