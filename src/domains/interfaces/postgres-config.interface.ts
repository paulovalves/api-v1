export interface PostgresConfig {
  getHost(): string;
  getPort(): number;
  getUsername(): string;
  getPassword(): string;
  getDatabase(): string;
  isSync(): boolean;
}
