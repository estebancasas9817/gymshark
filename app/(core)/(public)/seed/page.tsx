'use client';

const SeedPage = () => {
	const upload = async (e: any) => {
		const file = e.target.files[0];
		const form = new FormData();
		form.append('file', file);

		await fetch('/api/admin/import', {
			method: 'POST',
			body: form,
		});

		alert('Importado');
	};

	return <input type="file" accept=".csv" onChange={upload} />;
};

export default SeedPage;
