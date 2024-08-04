/*
  Warnings:

  - The primary key for the `job_registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `job_registrations` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`job_id`);

-- AddForeignKey
ALTER TABLE `job_registrations` ADD CONSTRAINT `job_registrations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_registrations` ADD CONSTRAINT `job_registrations_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
