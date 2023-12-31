import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import ToastManager, { Toast } from 'toastify-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../misc/colors';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [start, setStart] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const startSpeechToText = () => {
    //await Voice.start("en-US");
    setStart(true);
  };
  const stopSpeechToText = () => {
    //await Voice.stop();
    setStart(false);
  };
  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      onClose();
      return Toast.error('Please enter a title');
    }

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <ToastManager animationIn='slideInRight' animationOut='slideOutUp' hasBackdrop={true} />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title]}
          />
          <View style={styles.recordContainer}>
            <TextInput
              value={desc}
              multiline
              placeholder='Note'
              style={[styles.input, styles.desc]}
              onChangeText={text => handleOnChangeText(text, 'desc')}
            />
            <View style={styles.recordIcon} >
              {!start ?
                <MaterialCommunityIcons name="text-to-speech" size={35} color={color.PRIMARY} onPress={startSpeechToText} />
                :
                <MaterialCommunityIcons name="text-to-speech-off" size={35} color={color.PRIMARY} onPress={stopSpeechToText} />
              }

            </View>
          </View>

          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  recordIcon: {
    padding: 10,
    position: 'absolute',
    right: 0,
    marginTop: 20,

  },
});

export default NoteInputModal;
