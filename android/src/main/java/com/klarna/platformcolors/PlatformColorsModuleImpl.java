package com.klarna.platformcolors;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ColorPropConverter;

public class PlatformColorsModuleImpl {

    public static final String NAME = "KLAPlatformColors";

    public static String resolveColor(@Nullable ReadableMap color, @NonNull ReactApplicationContext appContext) {
        int resolvedColor = ColorPropConverter.getColor(color, appContext);
        int alpha = (resolvedColor >> 24) & 0xFF;
        if (alpha == 0xFF) {
            return String.format("#%06x", 0xFFFFFF & resolvedColor);
        } else {
            return String.format("#%06x%02x", 0xFFFFFF & resolvedColor, alpha);
        }
    }
}
