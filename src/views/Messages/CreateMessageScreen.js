import React, {useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createMessage} from '../../redux/actions/messageActions/createMessage';
import {Picker} from '@react-native-picker/picker';

const CreateMessageScreen = () => {
  const route = useRoute();
  const {accountId} = route.params;
  const dispatch = useDispatch();
  const [messageData, setMessageData] = useState({
    data: {},
    recipient: '',
    type: '',
  });
  const navigation = useNavigation();
  const toastRef = useRef(null);

  const onSubmitHandler = () => {
    dispatch(createMessage(messageData, accountId));
    if (toastRef.current) {
      toastRef.current.show({
        type: 'success',
        text1: 'Message created successfully!',
      });
    }
    navigation.navigate('Messages');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="accountId"
        value={accountId}
      />
      <Picker
        selectedValue={messageData.type}
        onValueChange={itemValue =>
          setMessageData({...messageData, type: itemValue})
        }>
        <Picker.Item label="Type" value="" />
        <Picker.Item label="Email" value="email" />
        <Picker.Item label="SMS" value="sms" />
        <Picker.Item label="Push" value="push" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Text"
        onChangeText={data => setMessageData({...messageData, data})}
        value={messageData.data}
      />
      <TextInput
        style={styles.input}
        placeholder="Client"
        onChangeText={recipient => setMessageData({...messageData, recipient})}
        value={messageData.recipient}
      />

      <Button title="Ajouter" onPress={onSubmitHandler} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateMessageScreen;
