import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class RefreshQuestionGuard extends AuthGuard(
  'refresh-question',
) {}
