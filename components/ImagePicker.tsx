import { useState } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button } from '@ui-kitten/components'

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          image ? { uri: image } : require('@/assets/images/default-image.png')
        }
        style={styles.image}
      />
      <Button onPress={pickImage}>Upload</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    marginBottom: 16,
  },
})
