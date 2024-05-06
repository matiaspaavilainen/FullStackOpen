import { useState, useEffect } from 'react'


import Form from './components/Form'
import Filter from './components/Filter'
import AllPersons from './components/AllPersons'
import numberService from './services/numberService'
import Notification from './components/notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [type, setType] = useState(null)

	useEffect(() => {
		numberService.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={errorMessage} type={type} />
			<Filter persons={persons} setPersons={setPersons} />
			<Form
				persons={persons}
				setPersons={setPersons}
				setErrorMessage={setErrorMessage}
				setType={setType}
			/>
			<AllPersons
				persons={persons}
				setPersons={setPersons}
				setErrorMessage={setErrorMessage}
				setType={setType}
			/>
		</div>
	)
}

export default App