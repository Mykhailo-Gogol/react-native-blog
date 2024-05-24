import { Image, StyleSheet } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function ChatScreen() {
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
      <ThemedView style={{ paddingHorizontal: 16, paddingTop: 80 }}>
        <ThemedText
          type="title"
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          Chat Screen
        </ThemedText>
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
