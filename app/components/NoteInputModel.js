import { StyleSheet, Text, Modal, StatusBar, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import color from '../misc/color';
import RoundIconBtn from './RoundIconBtn';
import ToastManager, { Toast } from 'toastify-react-native'

const NoteInputModel = ({ visible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
    }
    const handleSubmit = () => {
        if(!title.trim()){
            onClose();
            return Toast.error('Please Add Title');
        }
        onSubmit(title, description);
        setDescription('');
        setTitle('');
    }
    const handleClose = () => {
        setDescription('');
        setTitle('');
        return onClose();
    }
    return (
        <>
            <StatusBar hidden />
            <ToastManager style={{zIndex:2}} animationIn="slideInRight" animationOut='slideOutUp'/>
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput
                        value={title}
                        placeholder="Title"
                        style={[styles.input, styles.title]}
                        onChange={(e) => setTitle(e)}
                    />
                    <TextInput
                        multiline
                        value={description}
                        placeholder="Description"
                        style={[styles.input, styles.desc]}
                        onChange={(e) => setDescription(e)}

                    />
                    <View style={styles.btnContainer}>
                        <RoundIconBtn
                            antIconSize={15}
                            style={{ marginRight: 15 }}
                            antIconName='check'
                            press={handleSubmit}
                        />
                        {title.trim() || description.trim()?
                        <RoundIconBtn
                            antIconSize={15}
                            antIconName='close' 
                            press={handleClose}
                            />
                        :
                        null
                        }
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

export default NoteInputModel

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: color.PRIMARY,
        fontSize: 20,
        color: color.DARK,
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
        paddingVertical: 20,
    }

})