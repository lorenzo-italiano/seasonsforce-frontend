export function formatDateToISO(dateStr: string): string | null {
	const parts = dateStr.split('/');
	if (parts.length === 3) {
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10);
		const year = parseInt(parts[2], 10);

		const isoString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00.000Z`;

		return isoString;
	}

	return null;
}

export function formatIsoToSimpleDate(dateStr: string): string {
	const dateObject = new Date(dateStr);

	if (isNaN(dateObject.getTime())) {
		// Gérer les cas où la date d'entrée n'est pas valide
		return 'Date invalide';
	}

	const day = String(dateObject.getDate()).padStart(2, '0');
	const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Les mois sont 0-indexés
	const year = dateObject.getFullYear();

	return `${day}/${month}/${year}`;
}