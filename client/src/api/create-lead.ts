import { useLeads } from '@/stores/leads'
import axios from 'axios'

export const createLead = async (): Promise<Entity | null> => {
	try {
		const response = await axios('/leads', {
			method: 'post',
			baseURL: 'http://localhost:3000'
		})

		useLeads().addLead(response.data)

		return response.data
	} catch {
		return null
	}
}