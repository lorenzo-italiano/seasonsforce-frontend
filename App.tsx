import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, Text} from 'react-native';
import Test from "./src/Test";
import { NativeWindStyleSheet } from "nativewind";
import RecruiterList from "./src/RecruiterList";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavigationContainer, StackRouter} from "@react-navigation/native";
import {ScreenStack} from "react-native-screens";
import Home from "./src/page/Home";
import Notification from "./src/page/Notification";
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Conversation from "./src/page/Conversation";
import Jobs from "./src/page/Jobs";
import Profile from "./src/page/Profile";


NativeWindStyleSheet.setOutput({
    default: "native",
});

const queryClient = new QueryClient()

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        //TODO mettre une couleur de la palette
                        tabBarActiveTintColor: '#a83232',
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Messages"
                        component={Conversation}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="message" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Jobs"
                        component={Jobs}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="work" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Notifications"
                        component={Notification}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="bell" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="user" color={color} size={size} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}