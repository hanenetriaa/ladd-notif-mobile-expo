import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getAccount} from '../../redux/actions/accountActions/getAccount';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailsAccountScreen = () => {
  const {params} = useRoute();
  const {accountId} = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {account, loading, error} = useSelector(state => state.detailsAccount);
  console.log(account);

  useEffect(() => {
    dispatch(getAccount(accountId));
  }, [dispatch, accountId]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!account) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account Details</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateMessage', {accountId})}>
            <Icon name="ios-chatbox-ellipses-outline" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>ID:</Text>
        <Text style={styles.detailsText}>{account.accountId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Name:</Text>
        <Text style={styles.detailsText}>{account.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Status:</Text>
        <Text style={styles.detailsText}>{account.status}</Text>
      </View>
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

  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  detailsText: {
    flex: 1,
    color: '#333333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
});

export default DetailsAccountScreen;
