import React, {createContext, useEffect, useState} from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import enTranslations from '../i18n/locales/en.json';
import frTranslations from '../i18n/locales/fr.json';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface I18nContextProps {
	i18n: I18n
	changeLanguage: (selectedLanguage: string) => void
}

const translations = {
	en: enTranslations,
	fr: frTranslations,
}

export const I18nContext = createContext<I18nContextProps | null>(null);

export const I18nProvider: React.FC = ({ children }) => {

	const [i18n, setI18n] = useState<I18n>(() => {
		const instance = new I18n(translations);
		instance.locale = Localization.locale;
		instance.enableFallback = true;
		instance.defaultLocale = 'fr';
		return instance;
	});

	useEffect(() => {
		const initializeI18n = async () => {
			const language = await AsyncStorage.getItem('language') ?? 'fr'
			setI18n(prevState => {
				prevState.locale = language
				return prevState
			});
		};

		initializeI18n();
	}, []);

	const changeLanguage = async (selectedLanguage: string) => {
		i18n.locale = selectedLanguage;
		await AsyncStorage.setItem('language', selectedLanguage);
	}

	return (
		<I18nContext.Provider value={{ i18n, changeLanguage }}>{children}</I18nContext.Provider>
	);
};

export default I18nProvider;
