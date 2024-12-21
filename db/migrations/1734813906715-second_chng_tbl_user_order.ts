import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondChngTblUserOrder1734813906715 implements MigrationInterface {
    name = 'SecondChngTblUserOrder1734813906715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d"`);
        await queryRunner.query(`CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL DEFAULT ' ', "address" character varying NOT NULL, "city" character varying NOT NULL, "postode" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d" FOREIGN KEY ("shippingAddressId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d"`);
        await queryRunner.query(`DROP TABLE "shippings"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d" FOREIGN KEY ("shippingAddressId") REFERENCES "shipping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
