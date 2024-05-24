import { useState, useEffect } from 'react'
import { supabase } from '../../api/supabase'
import { StyleSheet, View, Alert, Image } from 'react-native'
import { Button, Input } from '@ui-kitten/components'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { useRouter } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import ImagePickerExample from '@/components/ImagePicker'
import Spinner from 'react-native-loading-spinner-overlay'
import { ThemedText } from '@/components/ThemedText'
import { useAuthStore } from '@/utils/zustand'

export default function AccountScreen() {
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const { token, user, setToken, setUser } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (token) getProfile()
  }, [token])

  async function getProfile() {
    try {
      setLoading(true)
      if (!token) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    fullname,
    username,
    avatar_url,
  }: {
    fullname: string
    username: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!token) throw new Error('No user on the session!')

      const updates = {
        id: user?.id,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      supabase.auth.signOut()
      setToken(undefined)
      setUser(null)
      router.push('/(tabs)')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
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
          Account Info
        </ThemedText>

        <ImagePickerExample user={user} />

        <View style={{ marginBottom: 16 }}>
          <Input placeholder="email" value={user?.email} disabled />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input
            placeholder="full name"
            value={fullname || ''}
            onChangeText={(text) => setFullname(text)}
            disabled={!token}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input
            autoCapitalize="none"
            placeholder="username"
            value={username || ''}
            onChangeText={(text) => setUsername(text)}
            disabled={!token}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Button
            onPress={() =>
              updateProfile({ fullname, username, avatar_url: avatarUrl })
            }
            disabled={loading || !token}
          >
            {loading ? 'Loading ...' : 'Update'}
          </Button>
        </View>

        <View>
          <Button status="basic" onPress={signOut} disabled={!token}>
            Sign Out
          </Button>
        </View>
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
