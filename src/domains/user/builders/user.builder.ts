import { UserEntity, UserRoleEntity, UserStatusEntity } from "../entities";

export default class UserBuilder {
  private readonly _user: UserEntity;

  private constructor() {
    this._user = new UserEntity();
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }

  id(value: number): this {
    this._user.id = value;
    return this;
  }

  name(value: string): this {
    this._user.name = value;
    return this;
  }

  email(value: string): this {
    this._user.email = value;
    return this;
  }

  password(value: string): this {
    this._user.password = value;
    return this;
  }

  dob(value: Date): this {
    this._user.date_of_birth = value;
    return this;
  }

  role(value: UserRoleEntity): this {
    this._user.role = value;
    return this;
  }

  status(value: UserStatusEntity): this {
    this._user.status = value;
    return this;
  }

  build(): UserEntity {
    return this._user;
  }
}
