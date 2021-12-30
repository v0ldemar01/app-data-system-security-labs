import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { IGetConfig } from 'common/models';
import { SystemLogService } from 'system-log/system-log.service';

@Controller('system-logs')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getSystemLogs(@Query() config: IGetConfig) {
    return this.systemLogService.getSystemLogs(config);
  }
}
