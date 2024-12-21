import { MigrationInterface, QueryRunner } from "typeorm";

export class ForthChngTblUserOrder1734814388596 implements MigrationInterface {
    name = 'ForthChngTblUserOrder1734814388596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products" RENAME COLUMN "product_quality" TO "product_quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products" RENAME COLUMN "product_quantity" TO "product_quality"`);
    }

}
