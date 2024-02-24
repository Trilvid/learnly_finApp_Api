import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../auth/schemas/user.schema';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || ![Role.Admin, Role.SuperAdmin].includes(user.role)) {
      // return false;
      throw new UnauthorizedException("Sorry You do not have permission to perfom this task")
    }

    return true;
  }
}
