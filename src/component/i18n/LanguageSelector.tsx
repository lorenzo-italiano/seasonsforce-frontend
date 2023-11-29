import {View, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useContext, useState} from "react";
import {I18nContext} from "../../context/I18nContext";

const LanguageSelector = () => {
	const { i18n, changeLanguage } = useContext(I18nContext);

	const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);

	return (
		<View className="w-full">
			<Text className="font-bold text-lg">{i18n.t("common.select-language")}</Text>
			<Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue) => {
					changeLanguage(itemValue)
					setSelectedLanguage(itemValue)
				}}
				numberOfLines={1}
			>
				<Picker.Item label="Français" value="fr" />
				<Picker.Item label="English" value="en" />
			</Picker>
		</View>
	);
};

export default LanguageSelector;