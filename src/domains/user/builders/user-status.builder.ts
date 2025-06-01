import { UserStatusEntity } from "../entities";

/**
 * Builder to dynamically create an {@link UserStatusEntity}
 *
 * @Param id: {@link Number}
 * @Param id_user: {@link Number}
 * @Param description: {@link String}
 * @Param created_at: {@link Date}
 * @Param updated_at: {@link Date}
 * @Param deleted_at: {@link Date}
 * @Param is_active: {@link boolean}
 */
export class UserStatusBuilder {
  private readonly _status: UserStatusEntity;

  private constructor() {
    this._status = new UserStatusEntity();
  }

  static builder(): UserStatusBuilder {
    return new UserStatusBuilder();
  }

  id(id: number): this {
    this._status.id = id;
    return this;
  }

  id_user(value: number): this {
    this._status.id_user = value;
    return this;
  }

  description(value: string): this {
    this._status.description = value;
    return this;
  }

  created_at(value: Date): this {
    this._status.created_at = value;
    return this;
  }

  updated_at(value: Date): this {
    this._status.updated_at = value;
    return this;
  }

  deleted_at(value: Date): this {
    this._status.deleted_at = value;
    return this;
  }

  is_active(value: boolean): this {
    this._status.is_active = value;
    return this;
  }

  build(): UserStatusEntity {
    return this._status;
  }


}
