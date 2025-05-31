/*
  Warnings:

  - You are about to alter the column `tipo` on the `dinosaurio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `dificultad` on the `juego` table. All the data in the column will be lost.
  - You are about to drop the column `puntajeTotal` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dinosaurio` MODIFY `tipo` ENUM('HERBIVORO', 'CARNIVORO', 'OMNIVORO') NOT NULL;

-- AlterTable
ALTER TABLE `juego` DROP COLUMN `dificultad`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `puntajeTotal`;
