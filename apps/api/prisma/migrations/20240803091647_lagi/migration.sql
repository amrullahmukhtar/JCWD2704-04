/*
  Warnings:

  - A unique constraint covering the columns `[job_id,user_id]` on the table `job_registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `job_registrations_job_id_user_id_key` ON `job_registrations`(`job_id`, `user_id`);
