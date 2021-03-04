import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../pages/StartScreen';
import Dashboard from '../pages/Dashboard';
import Lessons from '../pages/Lessons';
import Lesson from '../pages/Lesson';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#6548A3' },
    }}
  >
    <App.Screen name="StartScreen" component={StartScreen} />
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Lessons" component={Lessons} />
    <App.Screen name="Lesson" component={Lesson} />
  </App.Navigator>
);

export default AppRoutes;
