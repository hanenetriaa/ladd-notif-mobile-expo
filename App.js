import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect, Provider } from "react-redux";
import HomeScreen from "./src/views/HomeScreen";
import LoginScreen from "./src/views/Auth/LoginScreen";
import PasswordScreen from "./src/views/Auth/PasswordScreen";
import RegisterScreen from "./src/views/Auth/RegisterScreen";
import Navbar from "./src/components/Navbar";
import UsersScreen from "./src/views/Users/UsersScreen";
import MessagesScreen from "./src/views/Messages/MessagesScreen";
import AccountsScreen from "./src/views/Accounts/AccountsScreen";
import DetailsAccountScreen from "./src/views/Accounts/DetailsAccountScreen";
import CreateMessageScreen from "./src/views/Messages/CreateMessageScreen";
import store from "./src/redux/store";

// création des stacks de navigation
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// composant pour la navigation de l'authentification
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Password" component={PasswordScreen} />
    </AuthStack.Navigator>
  );
}

// composant pour la navigation principale
function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Navbar" component={Navbar} />
      <MainStack.Screen name="Users" component={UsersScreen} />
      <MainStack.Screen name="Accounts" component={AccountsScreen} />
      <MainStack.Screen
        name="DetailsAccount"
        component={DetailsAccountScreen}
      />
      <MainStack.Screen name="Messages" component={MessagesScreen} />
      <MainStack.Screen name="CreateMessage" component={CreateMessageScreen} />
    </MainStack.Navigator>
  );
}

// composant principal connecté à Redux
const App = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

// fonction pour mapper l'état Redux au composant
const mapStateToProps = (state) => state;

const ConnectedApp = connect(mapStateToProps)(App);

const RNRedux = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default RNRedux;
