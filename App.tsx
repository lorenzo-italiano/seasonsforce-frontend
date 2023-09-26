import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Test from "./src/Test";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});


export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-blue-400 text-md font-bold mt-2">
                Open up App.js to start working on your app!
            </Text>
            <Test></Test>
            <StatusBar style="auto" />
        </View>
    );
}