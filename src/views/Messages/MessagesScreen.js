import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SearchMessages} from '../../redux/actions/messageActions/searchMessage.js';

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const {messageList, loading, error} = useSelector(state => state.messages);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterRecipient, setFilterRecipient] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterData, setFilterData] = useState('');

  useEffect(() => {
    dispatch(SearchMessages());
  }, [dispatch]);

  useEffect(() => {
    let filtered = messageList;
    if (filterRecipient.length > 0) {
      filtered = filtered.filter(message =>
        message.recipient.includes(filterRecipient),
      );
    }
    if (filterType.length > 0) {
      filtered = filtered.filter(message => message.type === filterType);
    }
    if (filterData.length > 0) {
      filtered = filtered.filter(
        message => message.data.text && message.data.text.includes(filterData),
      );
    }
    setFilteredMessages(filtered);
  }, [filterRecipient, filterType, filterData, messageList]);

  const handleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilterMessages = () => {
    setShowFilterModal(false);
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!messageList) {
    return <Text>Loading...</Text>;
  }

  if (filteredMessages.length === 0) {
    return <Text>No Messages found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages List</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleToggleFilterModal}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMessages}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>MessagesId: {item.messageId}</Text>
            <Text style={styles.cardText}>
              accountId: {item.accountId.name}
            </Text>
            <Text style={styles.cardText}>status {item.status}</Text>
            <Text style={styles.cardText}>type: {item.type}</Text>
            <Text style={styles.cardText}>recipient {item.recipient}</Text>
            <Text style={styles.cardText}>sentAt: {item.sentAt}</Text>
            {item.data.text && (
              <Text style={styles.cardText}>data: {item.data.text}</Text>
            )}
          </View>
        )}
      />

      <Modal visible={showFilterModal} animationType="slide">
        <View style={styles.filterModalContainer}>
          <TextInput
            style={styles.filterTextInput}
            placeholder="Filter by recipient"
            value={filterRecipient}
            onChangeText={setFilterRecipient}
          />
          <TextInput
            style={styles.filterTextInput}
            placeholder="Filter by type"
            value={filterType}
            onChangeText={setFilterType}
          />
          <TextInput
            style={styles.filterTextInput}
            placeholder="Filter by data"
            value={filterData}
            onChangeText={setFilterData}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterMessages}>
            <Text style={styles.filterButtonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleToggleFilterModal}>
            <Text style={styles.filterButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  filterTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
});
