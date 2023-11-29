import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = () => {
	return (
		<View className="flex flex-1 items-center justify-center">
			<ActivityIndicator size="large" color="#0D3B66" />
		</View>
	)
}

export default LoadingSpinner;