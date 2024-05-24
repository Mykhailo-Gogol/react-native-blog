import { Alert, Image, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { Button, Input } from '@ui-kitten/components'
import Spinner from 'react-native-loading-spinner-overlay'

import { useState } from 'react'
import { supabase } from '../../api/supabase'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { useAuthStore } from '@/utils/zustand'

export default function SignInScreen() {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('qweQWE123!!!')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { setToken, setUser } = useAuthStore()

  async function signInWithEmail() {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message || 'oops')
      if (data) Alert.alert(data.user?.email || 'nice')

      setToken(data.session?.access_token)
      setUser(data.user)
      router.push('/account')
      setLoading(false)
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
          Hey there!
        </ThemedText>
        <ThemedView>
          <Input
            autoCapitalize={'none'}
            placeholder="email"
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Input
            autoCapitalize={'none'}
            placeholder="password"
            value={password}
            onChangeText={(nextValue) => setPassword(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Button
            onPress={signInWithEmail}
            disabled={loading || !email || !password}
            style={{ marginBottom: 8 }}
          >
            Sign In
          </Button>
          <Button
            status="basic"
            onPress={() => router.push('/signup')}
            disabled={loading || !email || !password}
            style={{ marginBottom: 8 }}
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
