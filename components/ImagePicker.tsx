import { useCallback, useEffect, useState } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button } from '@ui-kitten/components'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system'
import { useFocusEffect } from 'expo-router'

export default function ImagePickerExample({
  session,
}: {
  session: Session | null
}) {
  const [image, setImage] = useState<string | null>(null)

  const loadImage = async () => {
    try {
      if (session?.user.id) {
        const { data } = await supabase.storage
          .from('avatars')
          .getPublicUrl(session?.user.id!)

        setImage(data?.publicUrl)
        console.log(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      })
      // Save image if not cancelled
      if (!result.canceled) {
        console.log(result.assets[0].uri)

        const img = result.assets[0]
        setImage(result.assets[0].uri)

        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: 'base64',
        })
        const filePath = `${session?.user!.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`
        const contentType = img.type === 'image' ? 'image/png' : 'video/mp4'
        await supabase.storage
          .from('avatars')
          .upload(filePath, decode(base64), { contentType })
        loadImage()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadImage()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Image
        source={
          image ? { uri: image } : require('@/assets/images/default-image.png')
        }
        style={styles.image}
      />
      <Button onPress={pickImage} disabled={!session}>
        Upload
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    marginBottom: 8,
  },
})
