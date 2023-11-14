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