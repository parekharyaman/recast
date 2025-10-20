import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerationsTemplateTable1760937160128
  implements MigrationInterface
{
  name = "GenerationsTemplateTable1760937160128";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "generations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "templateId" uuid, "openaiJobId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9d2a52fbde1fba42c24ec42ddd2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2a1ec14c609ee042edbbbc0a8" ON "generations" ("userId") `
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "openaiRemixVideoId" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "generations" ADD CONSTRAINT "FK_3cbb643c4e2289d7bbe7a4593da" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "generations" DROP CONSTRAINT "FK_3cbb643c4e2289d7bbe7a4593da"`
    );
    await queryRunner.query(`DROP TABLE "templates"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c2a1ec14c609ee042edbbbc0a8"`
    );
    await queryRunner.query(`DROP TABLE "generations"`);
  }
}
