import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContacts = defineStore('contacts', () => {
	const contacts = ref<Entity[]>([])

	const addContact = (contact: Entity) => {
		contacts.value.push(contact)
	}

	return { contacts, addContact }
})