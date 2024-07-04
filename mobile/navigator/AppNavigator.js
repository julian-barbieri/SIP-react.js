// AppNavigator.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import HomeSuperScreen from '../screens/HomeSuperScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import MapaScreen from '../screens/MapaScreen.js';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ocultar el encabezado
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} // Ocultar el encabezado
        />
        <Stack.Screen 
          name="HomeSuper" 
          component={HomeSuperScreen} 
          options={{ headerShown: false }} // Ocultar el encabezado
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} // Usa el DrawerNavigator aquí
          options={{ headerShown: false }} // Ocultar el encabezado del Stack, ya que lo maneja el Drawer
        />
        <Stack.Screen 
          name="Mapa" 
          component={MapaScreen} 
          options={{ headerShown: false }} // Ocultar el encabezado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
