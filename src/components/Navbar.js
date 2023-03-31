import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/actions/authActions/auth';
import UsersScreen from '../views/Users/UsersScreen';
import MessagesScreen from '../views/Messages/MessagesScreen';
import AccountsScreen from '../views/Accounts/AccountsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../views/Users/ProfileScreen';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const LogoutScreen = () => {
    return null; // You can customize this screen with your own UI
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-people-sharp" size={25} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-chatbubbles" size={25} />,
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-documents" size={25} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Ionicons name="person-circle-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          tabBarIcon: () => <Ionicons name="ios-log-out" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
