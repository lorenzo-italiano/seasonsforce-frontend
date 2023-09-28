import { NativeWindStyleSheet } from "nativewind";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Conversation from "@screen/Conversation";
import Jobs from "@screen/Jobs";
import Profile from "@screen/Profile";
import Notification from "@screen/Notification";
import Home from "@screen/Home";

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