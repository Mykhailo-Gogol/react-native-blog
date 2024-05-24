import { Alert, Image, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { Button, Input } from '@ui-kitten/components'

import { useState } from 'react'
import { supabase } from '@/api/supabase'
import { useRouter } from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay'
import { ThemedText } from '@/components/ThemedText'

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function signUpWithEmail() {
    try {
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      if (!session)
        Alert.alert('Please check your inbox for email verification!')
      setLoading(false)

      router.push('/index')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/poster.jpeg')}
          style={styles.banner}
        />
      }
    >
      <Spinner visible={loading} />
      <ThemedView style={{ paddingHorizontal: 16, paddingTop: 80 }}>
        <ThemedText
          type="title"
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          Welcome!
        </ThemedText>
        <ThemedView>
          <Input
            autoCapitalize="none"
            placeholder="email"
            value={email}
            onChangeText={(nextValue: string) => setEmail(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Input
            autoCapitalize="none"
            placeholder="password"
            value={password}
            onChangeText={(nextValue: string) => setPassword(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Button
            onPress={signUpWithEmail}
            disabled={loading || !email || !password}
          >
            Sign Up
          </Button>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  banner: {
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
