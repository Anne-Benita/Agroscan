import { Stack } from "expo-router";
import { AuthProvider } from "../services/authContext";
import {
  useFonts,
  Onest_400Regular,
  Onest_500Medium,
  Onest_700Bold,
} from "@expo-google-fonts/onest";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";

// Global font injection for Onest (intercepts react-native's Text export in the module cache)
try {
  const ReactNative = require('react-native');
  const OriginalText = ReactNative.Text;
  
  const PatchedText = React.forwardRef((props: any, ref: any) => {
    const { style, ...rest } = props;
    const flattenedStyle = ReactNative.StyleSheet.flatten(style);
    
    let fontFamily = 'Onest_400Regular';
    if (flattenedStyle) {
      if (flattenedStyle.fontFamily && (
        flattenedStyle.fontFamily.includes('Onest') || 
        flattenedStyle.fontFamily.includes('mono') || 
        flattenedStyle.fontFamily.includes('Courier')
      )) {
        fontFamily = flattenedStyle.fontFamily; // Keep existing Onest or monospaced fonts intact
      } else {
        const weight = flattenedStyle.fontWeight;
        if (weight === 'bold' || weight === '700' || weight === '800' || weight === '900') {
          fontFamily = 'Onest_700Bold';
        } else if (weight === '500' || weight === '600') {
          fontFamily = 'Onest_500Medium';
        }
      }
    }
    
    return <OriginalText {...rest} ref={ref} style={[{ fontFamily }, style]} />;
  });
  
  // Inherit static properties
  Object.assign(PatchedText, OriginalText);
  PatchedText.displayName = 'Text';
  
  // Mutate the module cache getter directly using Object.defineProperty
  Object.defineProperty(ReactNative, 'Text', {
    get: () => PatchedText,
    configurable: true
  });
} catch (e) {
  console.warn("Failed to inject Onest font globally:", e);
}

// Keep splash screen visible until fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Onest_400Regular,
    Onest_500Medium,
    Onest_700Bold,
  });

  useEffect(() => {
    // Inject Onest font via Google Fonts for Web target to ensure the 'Onest' family name works with standard weights
    if (typeof window !== 'undefined' && window.document) {
      const linkId = 'google-fonts-onest';
      if (!window.document.getElementById(linkId)) {
        const link = window.document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap';
        window.document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="home" />
        <Stack.Screen name="result" />
      </Stack>
    </AuthProvider>
  );
}