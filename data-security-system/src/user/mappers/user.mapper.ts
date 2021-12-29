import { User } from '../user.entity';
import { UserDto } from '../dtos';

export class UserMapper {
  public static mapEntityToDTO(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.role = entity.role;
    return dto;
  }
}
