import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1745743481664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET search_path TO public;`);
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "public.user_role" (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(50) UNIQUE NOT NULL,
          "description" VARCHAR(255) NOT NULL
        );
      `);
    await queryRunner.query(`
        INSERT INTO "public.user_role" (name, description)
        VALUES
          ('admin', 'Administrator role with full access'),
          ('user', 'Regular user role with limited access')
        ON CONFLICT (name) DO NOTHING;
      `);
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "public.user" (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255) NOT NULL,
          "email" VARCHAR(255) UNIQUE NOT NULL,
          "password" VARCHAR(255) NOT NULL,
          "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "role" INTEGER NOT NULL
        );
        ALTER TABLE "public.user" ADD CONSTRAINT "FK_user_role" FOREIGN KEY ("role") REFERENCES "public.user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        CREATE UNIQUE INDEX "IDX_user_role_unique" ON "public.user" ("role", "email");
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "public.user";
      `);
  }
}
