import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './app/screens/NoteScreen';

export default function App() {
  const [user,setuser] = useState('');
  const findUser = async() => {
    const result = await AsyncStorage.getItem('User');
    if(result){
    setuser(JSON.parse(result));}
  }
  useEffect(()=>{
     findUser();
  },[]);
  if(!user.name)
    return <Intro onFinish={findUser}/>
  return (
    <NoteScreen user={user }/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
