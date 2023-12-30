import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../misc/color'
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModel from '../components/NoteInputModel';

const NoteScreen = ({ user }) => {
  const [greet, setgreet] = useState('Evening');
  const [modalVisible, setmodalVisible] = useState(false);
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setgreet('Morning');
    else if (hours >= 12 && hours < 17) return setgreet('Noon');
    else if (hours >= 17 && hours <= 18) return setgreet('Afternoon');
    setgreet('Evening');
  };
  const handleOnSubmit = (title, desc) => {
    console.log(title, desc);
  }
  useEffect(() => {
    findGreet();
  }, []);
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={color.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        <SearchBar containerStyle={{ marginVertical: 15 }} />
        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeadingContainer]}>
          <Text style={styles.emptyHeading}>Add Notes</Text>
          <RoundIconBtn
            antIconName='plus'
            style={styles.addBtn}
            press={() => setmodalVisible(true)}
          />
        </View>
      </View>
      <NoteInputModel
        visible={modalVisible}
        onClose={() => setmodalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',

  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  emptyHeadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  emptyHeading: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,

  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  }
})
export default NoteScreen
