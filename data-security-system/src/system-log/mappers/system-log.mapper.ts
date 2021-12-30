import { SystemLog } from 'system-log/system-log.entity';
import { SystemLogDto } from 'system-log/dtos';

export class SystemLogMapper {
  public static mapEntityToDTO(entity: SystemLog): SystemLogDto {
    const dto = new SystemLogDto();
    dto.id = entity.id;
    dto.level = entity.level;
    dto.message = entity.message;
    dto.user.id = entity.user.id;
    dto.user.email = entity.user.email;
    dto.user.role = entity.user.role;
    return dto;
  }
}
