import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import './App.css';
import './components/Header/Header.css';

export default function App() {
	const [photos, setPhotos] = useState([]);
	return (
		<div>
			<header>
				<Formik initialValues={{ search: '' }} onSubmit={search}>
					<Form>
						<Field name='search' />
					</Form>
				</Formik>
			</header>
		</div>
	);
}

async function search(values) {
	const result = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
		{ headers: { 'Authorization': 'Client-ID UI1sdidWf3xXSfhQaEjFw1jBd3KGs-ZFoR0SVkyYmL4' } });
	const data = await result.json();
	photos = data.results;
}