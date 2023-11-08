export function formatDateToISO(dateStr: string): string | null {
	const parts = dateStr.split('/');
	if (parts.length === 3) {
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Les mois commencent à 0 (0 = janvier, 1 = février, etc.)
		const year = parseInt(parts[2], 10);

		const date = new Date(year, month - 1, day);

		if (!isNaN(date.getTime())) {
			// La date est valide
			return date.toISOString();
		}
	}

	return null; // Retourne null si la date n'est pas valide
}