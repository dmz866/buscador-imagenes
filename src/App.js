import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import './App.css';
import './components/Header/Header.css';

export default function App() {
	const [photos, setPhotos] = useState([]);
	console.log(photos)
	return (
		<div>
			<header>
				<Formik initialValues={{ search: '' }} onSubmit={search}>
					<Form>
						<Field name='search' />
					</Form>
				</Formik>
			</header>
			<div className='container'>
				<div className='center'>
					{
						photos.map(photo =>
							<article key={photo.id} onClick={() => open(photo.links.html)}>
								<img src={photo.urls.regular} />
								<p>{[photo.description, photo.alt_description].join(' - ')}</p>
							</article>)
					}
				</div>
			</div>
		</div>
	);

	function open(link) {
		window.open(link);
	}

	async function search(values) {
		const result = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
			{ headers: { 'Authorization': 'Client-ID UI1sdidWf3xXSfhQaEjFw1jBd3KGs-ZFoR0SVkyYmL4' } });
		const data = await result.json();
		setPhotos(data.results);
	}
}

