import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SearchAccounts} from '../../redux/actions/accountActions/searchAccounts';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountsScreen = () => {
  const navigation = useNavigation();

  const handleDetailsAccount = accountId => {
    navigation.navigate('DetailsAccount', {accountId});
  };

  const dispatch = useDispatch();
  const {accountList, loading, error} = useSelector(state => state.accounts);
  console.log(accountList);
  useEffect(() => {
    dispatch(SearchAccounts());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!accountList) {
    return <Text>Loading...</Text>;
  }

  if (accountList.length === 0) {
    return <Text>No Accounts found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts List</Text>
      <FlatList
        data={accountList}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>ID: {item.accountId}</Text>
              <Text style={styles.cardText}>Name: {item.name}</Text>
              <Text style={styles.cardText}>Status: {item.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleDetailsAccount(item.accountId)}>
              <Icon
                name="ios-chevron-forward-circle-sharp"
                size={30}
                color="green"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333333',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  iconContainer: {
    marginLeft: 10,
    padding: 5,
  },
});
export default AccountsScreen;
