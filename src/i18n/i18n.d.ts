// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

declare module "i18next" {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: "translationFR";
		// custom resources type
		resources: {
			translationEN: typeof translationEN;
			translationFR: typeof translationFR;
		};
		// other
	}
}