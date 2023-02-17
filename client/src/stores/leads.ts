import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLeads = defineStore('leads', () => {
	const leads = ref<Entity[]>([])

	const addLead = (lead: Entity) => {
		leads.value.push(lead)
	}

	return { leads, addLead }
})