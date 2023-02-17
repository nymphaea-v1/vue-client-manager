import { useCompanies } from '@/stores/companies'
import axios from 'axios'

export const createCompany = async (): Promise<Entity | null> => {
	try {
		const response = await axios('/companies', {
			method: 'post',
			baseURL: 'http://localhost:3000'
		})

		useCompanies().addCompany(response.data)

		return response.data
	} catch {
		return null
	}
}