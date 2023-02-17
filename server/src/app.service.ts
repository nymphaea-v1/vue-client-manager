import { Injectable } from '@nestjs/common'
import axios from 'axios'

const PATHS = {
  leads: '/api/v4/leads',
  contacts: '/api/v4/contacts',
  companies: '/api/v4/companies'
}

let ACCESS_TOKEN
let BASE_URL

@Injectable()
export class AppService {
  onModuleInit() {
    login()
  }

  async create(type: keyof typeof PATHS) {
    const response = await axios(PATHS[type], {
      method: 'post',
      baseURL: BASE_URL,
      data: [{}],
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ACCESS_TOKEN
      }
    })

    return { id: response.data._embedded[type][0].id, type }
  }
}

const login = () => {
  if (
    process.env.CLIENT_ID === undefined ||
    process.env.SOURCE_URL === undefined
  )
    return

  axios
    .get(process.env.SOURCE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': process.env.CLIENT_ID
      }
    })
    .then((response) => {
      const result = response.data

      ACCESS_TOKEN = result.access_token
      BASE_URL = 'https://' + result.base_domain
    })
    .catch((error) => {
      console.log(error)
    })
}
