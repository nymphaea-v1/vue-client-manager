import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  PATHS = {
    leads: '/api/v4/leads',
    contacts: '/api/v4/contacts',
    companies: '/api/v4/companies'
  }

  ACCESS_TOKEN
  BASE_URL

  async onModuleInit() {
    await this.login()
  }

  async create(type: keyof typeof this.PATHS) {
    if (this.ACCESS_TOKEN === undefined && this.BASE_URL === undefined) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    let result

    try {
      result = await lastValueFrom(
        this.httpService
          .post(this.PATHS[type], [{}], {
            baseURL: this.BASE_URL,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.ACCESS_TOKEN
            }
          })
          .pipe(
            map((response) => ({
              id: response.data._embedded[type][0].id,
              type
            }))
          )
      )
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    return result
  }

  async login() {
    if (
      process.env.CLIENT_ID === undefined ||
      process.env.SOURCE_URL === undefined
    )
      return

    const data = await lastValueFrom(
      this.httpService
        .get(process.env.SOURCE_URL, {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': process.env.CLIENT_ID
          }
        })
        .pipe(map((response) => response.data))
    )

    this.ACCESS_TOKEN = data.access_token
    this.BASE_URL = 'https://' + data.base_domain
  }
}
