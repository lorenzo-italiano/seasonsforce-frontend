import {useTranslation} from "react-i18next";
import {View, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";

const LanguageSelector = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = (selectedLanguage) => {
		i18n.changeLanguage(selectedLanguage);
	};

	return (
		<View>
			<Text>{t('common.language')}</Text>
			<Picker
				selectedValue={i18n.language}
				onValueChange={(itemValue) => changeLanguage(itemValue)}
			>
				<Picker.Item label="Français" value="fr" />
				<Picker.Item label="English" value="en" />
			</Picker>
		</View>
	);
};

export default LanguageSelector;