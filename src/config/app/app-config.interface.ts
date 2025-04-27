export interface AppConfigInterface {
  getAppPort(): number;
  getRootPath(): string;
  getMigrationsPath(): string;
}