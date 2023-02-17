import { useContacts } from '@/stores/contacts'
import axios from 'axios'

export const createContact = async (): Promise<Entity | null> => {
	try {
		const response = await axios('/contacts', {
			method: 'post',
			baseURL: 'http://localhost:3000'
		})

		useContacts().addContact(response.data)

		return response.data
	} catch {
		return null
	}
}