import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(
    private configService: ConfigService,
    // @Inject('ENV_VARIABLES') private env: { [key: string]: string | undefined },
  ) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.configService.get<string>(key);
    if (!value && throwOnMissing) {
      throw new Error(`Erro de configuraçao - env.${key} nao existe`);
    } else {
      return <string>value;
    }
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key: string) => {
      this.getValue(key, true);
    });
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }
}
