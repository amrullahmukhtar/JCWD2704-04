/*
  Warnings:

  - The primary key for the `job_registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `job_registrations` table. All the data in the column will be lost.
  - You are about to alter the column `job_id` on the `job_registrations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `salary_expectation` to the `job_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `job_registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job_registrations` DROP PRIMARY KEY,
    DROP COLUMN `admin_id`,
    ADD COLUMN `salary_expectation` DOUBLE NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `job_id` INTEGER NOT NULL,
    MODIFY `interview_date` DATETIME(3) NULL,
    MODIFY `review` TEXT NULL,
    ADD PRIMARY KEY (`job_id`, `user_id`);
