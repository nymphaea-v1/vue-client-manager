import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCompanies = defineStore('companies', () => {
	const companies = ref<Entity[]>([])

	const addCompany = (contact: Entity) => {
		companies.value.push(contact)
	}

	return { companies, addCompany }
})