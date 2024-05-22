import { Image, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { Button, Input } from '@ui-kitten/components'

import { useState } from 'react'

export default function HomeScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.jpg')}
          style={styles.banner}
        />
      }
    >
      <ThemedView style={{ paddingHorizontal: 16, paddingTop: 100 }}>
        {/* <ImagePicker /> */}

        <ThemedView>
          <Input
            placeholder="email"
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder="password"
            value={password}
            onChangeText={(nextValue) => setPassword(nextValue)}
            style={{ marginBottom: 8 }}
          />
          <Button onPress={() => console.log('first')}>BUTTON</Button>
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
    height: 178,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
