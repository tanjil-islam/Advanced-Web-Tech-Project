import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdChngTblUserOrder1734814061148 implements MigrationInterface {
    name = 'ThirdChngTblUserOrder1734814061148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" RENAME COLUMN "postode" TO "postCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" RENAME COLUMN "postCode" TO "postode"`);
    }

}
