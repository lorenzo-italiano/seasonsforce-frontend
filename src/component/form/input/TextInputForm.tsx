import React from 'react';
import {Controller} from "react-hook-form";
import {TextInput, Text} from "react-native";

const TextInputForm = ({ label, name, control, rules, ...rest }) => {


	return (
		<>
			<Text className="font-bold text-lg">{label}</Text>
			<Controller
				defaultValue=""
				control={control}
				render={({ field, fieldState }) => (
					<>
						<TextInput
							className="border rounded p-2 mb-2"
							onChangeText={field.onChange}
							value={field.value}
							autoCapitalize="none"
							{...rest}
						/>
						{fieldState && fieldState.error && <Text className="text-error font-bold">{fieldState.error.message}</Text>}
					</>

				)}
				name={name}
				rules={rules}
			/>

		</>
	)
}

export default TextInputForm;