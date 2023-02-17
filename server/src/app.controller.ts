import { Controller, Post } from '@nestjs/common'
import { Header, Param } from '@nestjs/common/decorators'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'
import { AppService } from './app.service'

const validTypes = ['leads', 'contacts', 'companies']

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':type')
  @Header('Content-Type', 'application/json')
  async create(@Param() params) {
    const type = params.type

    if (!validTypes.includes(type))
      throw new HttpException('Invalid entity type', HttpStatus.NOT_FOUND)

    try {
      return await this.appService.create(type)
    } catch (error) {
      throw new HttpException('Something went wrong...', HttpStatus.BAD_REQUEST)
    }
  }
}
