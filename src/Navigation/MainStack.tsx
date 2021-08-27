import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddScreen from '../Screens/AddScreen';
import EditScreen from '../Screens/EditScreen';
import MainScreen from '../Screens/MainScreen';

const MainStack = () =>
{
    
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={MainScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='AddGame' component={AddScreen} />
                <Stack.Screen name='EditGame' component={EditScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack;