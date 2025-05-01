export class UserRole {
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  id: number;
  name: string;
  description: string;

  static toUserRole(userRole: UserRole): UserRole {
    const dto = new UserRole(userRole.id, userRole.name, userRole.description);
    return dto;
  }

  static fromId(id: number): UserRole {
    switch (id) {
      case 1:
        return new UserRole(1, 'ADMIN', 'Administrator role with full access');
      case 2:
        return new UserRole(2, 'USER', 'Regular user role with limited access');
      case 3:
        return new UserRole(3, 'GUEST', 'Guest user role with minimal access');
      default:
        throw new Error('Invalid user role ID');
    }
  }

  static fromName(name: string): UserRole {
    switch (name) {
      case 'ADMIN':
        return new UserRole(1, 'Admin', 'Administrator role with full access');
      case 'USER':
        return new UserRole(2, 'User', 'Regular user role with limited access');
      case 'GUEST':
        return new UserRole(3, 'Guest', 'Guest user role with minimal access');
      default:
        throw new Error('Invalid user role name');
    }
  }
}