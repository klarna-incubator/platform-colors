package com.klarna.platformcolors;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class PlatformColorsModule extends NativeKLAPlatformColorsSpec {
    private final @Nullable ReactApplicationContext appContext;

    PlatformColorsModule(@NonNull final ReactApplicationContext context) {
        super(context);
        appContext = context;
    }

    @Override
    @NonNull
    public String getName() {
        return PlatformColorsModuleImpl.NAME;
    }

    @Override
    public void resolveColor(@Nullable ReadableMap color,
                             @NonNull final Promise promise) {
        promise.resolve(PlatformColorsModuleImpl.resolveColor(color, appContext));
    }
    
    @Override
    public String resolveColorSync(@Nullable ReadableMap color) {
        return PlatformColorsModuleImpl.resolveColor(color, appContext);
    }
}
