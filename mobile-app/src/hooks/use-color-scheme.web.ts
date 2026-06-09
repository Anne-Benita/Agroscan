import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * Locked to 'light' mode on Web as per user preference.
 */
export function useColorScheme() {
  return 'light';
}
