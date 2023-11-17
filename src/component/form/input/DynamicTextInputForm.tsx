import React, { useEffect, useState} from 'react';
import {Controller} from "react-hook-form";
import {Pressable, Text, TextInput, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DynamicTextInputForm = ({name, label, getValues, setValue, control, rules, isUpdate, ...rest}, ref) => {

	useEffect(() => {
		setStrings(getValues(name) || [""])
	}, [])

	const addInput = () => {
		setStrings(() => {
			const curr = getValues(name) || [""]
			setValue(name, [...curr, ""])
			return [...curr, ""]
		})
	};

	const removeInput = (index) => {
		setStrings((prevStrings) => {
			const updatedStrings = [...prevStrings];
			updatedStrings.splice(index, 1);
			setValue(name, updatedStrings);
			return updatedStrings;
		});
	};

	const [strings, setStrings] = useState<Array<string>>([""])

	return (
		<>
			<View className="flex flex-row justify-between items-center mb-2">
				<Text className="font-bold text-lg">{label}</Text>

				<Pressable onPress={addInput}>
					<MaterialCommunityIcons name="plus-circle" size={28}/>
				</Pressable>
			</View>
			{strings.map((item, index) => (
				<Controller
					key={index}
					control={control}
					name={`${name}.${index}`}
					defaultValue={item || ''}
					render={({ field }) => (
						<View key={index} style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginBottom: 10 }}>
							<TextInput
								style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
								onChangeText={field.onChange}
								value={field.value}
								{...rest}
							/>
							<Pressable onPress={() => removeInput(index)}>
								<MaterialCommunityIcons name="delete" size={28}/>
							</Pressable>
						</View>
					)}
					rules={rules}
				/>
			))}
		</>
	)
}

export default DynamicTextInputForm;