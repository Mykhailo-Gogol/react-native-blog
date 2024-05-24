import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { AuthProvider, useAuth } from '@/components/AuthProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  const { session, initialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) return

    // Check if the path/url is in the (auth) group

    if (session) {
      // Redirect authenticated users to the list page
      router.replace('/(tabs)')
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/account')
    }
  }, [session, initialized])

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </ApplicationProvider>
  )
}
