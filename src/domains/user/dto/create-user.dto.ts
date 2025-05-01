import { UserEntity } from '@/domains/user/entities/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(name: string, email: string, password: string, role: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static toCreateDto(user: UserEntity) {
    return new CreateUserDto(
      user.name,
      user.email,
      user.password,
      user.role,
    );
  }
}
