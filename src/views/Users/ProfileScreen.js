import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/actions/userActions/GetUser';

const ProfileScreen = ({userId}) => {
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : user ? ( // <-- Add a check for user object
        <>
          <Image
            source={{uri: user.profilePicture}}
            style={styles.imageStyle}
          />
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
            {user.userId}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },
  email: {
    fontSize: 16,
    margin: 5,
  },
});

export default ProfileScreen;
