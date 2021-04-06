package com.klarna.platformcolors;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ColorPropConverter;

public class PlatformColorsModule extends ReactContextBaseJavaModule {
  public static final String PLATFORM_COLORS_MODULE = "KLAPlatformColors";
  private static final String LOG_TAG = PlatformColorsModule.class.getSimpleName();
  private final @Nullable ReactApplicationContext appContext;

  /** Default constructor. */
  public PlatformColorsModule(@NonNull final ReactApplicationContext reactContext) {
    super(reactContext);
    appContext = reactContext;
  }

  /** {@inheritDoc} */
  @Override
  @NonNull
  public String getName() {
    return PLATFORM_COLORS_MODULE;
  }

  protected String getHexColor(@Nullable ReadableMap color) {
    int resolvedColor = ColorPropConverter.getColor(color, appContext);
    String hexColor = Integer.toHexString(resolvedColor);
    return "#" + hexColor.substring(2) + hexColor.substring(0, 2);
  }

  @ReactMethod
  public void resolveColor(@Nullable ReadableMap color,
                           @NonNull final Promise promise) {
    promise.resolve(getHexColor(color));
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String resolveColorSync(@Nullable ReadableMap color) {
    return getHexColor(color);
  }
}
