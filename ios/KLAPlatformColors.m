#import "KLAPlatformColors.h"

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
  int rgb = (int)(r*255)<<16 | (int)(g*255)<<8 | (int)(b*255)<<0;
  return [NSString stringWithFormat:@"#%06x", rgb];
}

@end
