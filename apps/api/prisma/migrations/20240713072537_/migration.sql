-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(85) NOT NULL,
    `password` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `fullname` VARCHAR(85) NOT NULL,
    `gender` ENUM('male', 'female') NULL,
    `googleId` VARCHAR(191) NULL,
    `personal_summary` TEXT NULL,
    `role` ENUM('user', 'admin', 'developer') NOT NULL DEFAULT 'user',
    `phone_no` VARCHAR(25) NULL,
    `id_card` VARCHAR(16) NULL,
    `address` VARCHAR(255) NULL,
    `kota_kabupaten` VARCHAR(191) NULL,
    `provinsi` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `salary_expectations` INTEGER NULL,
    `subs_mode` ENUM('none', 'standard', 'premium') NOT NULL DEFAULT 'none',
    `subs_start_date` DATETIME(3) NULL,
    `subs_end_date` DATETIME(3) NULL,
    `company_name` VARCHAR(100) NULL,
    `company_logo` VARCHAR(191) NULL,
    `company_summary` TEXT NULL,
    `company_location` VARCHAR(255) NULL,
    `contact_email` VARCHAR(50) NULL,
    `contact_phone` VARCHAR(25) NULL,
    `bank_acc_no` VARCHAR(75) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_id_card_key`(`id_card`),
    INDEX `users_fullname_email_role_idx`(`fullname`, `email`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `company_name` VARCHAR(100) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `details` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `earned_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `educations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `institution_name` VARCHAR(100) NOT NULL,
    `details` TEXT NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(85) NOT NULL,
    `details` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `hire_position` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('published', 'finished') NOT NULL DEFAULT 'published',
    `location` VARCHAR(191) NOT NULL,
    `posted_date` DATETIME(3) NOT NULL,
    `closing_date` DATETIME(3) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_registrations` (
    `job_id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(191) NOT NULL,
    `application_date` DATETIME(3) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `interview_date` DATETIME(3) NOT NULL,
    `review` TEXT NOT NULL,

    PRIMARY KEY (`job_id`, `admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessments` (
    `id` VARCHAR(191) NOT NULL,
    `developer_id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_assessments` (
    `user_id` VARCHAR(191) NULL,
    `assessment_id` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `completed_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`assessment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL,
    `assessment_id` VARCHAR(191) NOT NULL,
    `question` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answers` (
    `id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `answer` TEXT NOT NULL,
    `status` ENUM('correct', 'wrong') NOT NULL DEFAULT 'wrong',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_answers` (
    `user_id` VARCHAR(191) NOT NULL,
    `question_id` INTEGER NOT NULL,
    `answer` TEXT NOT NULL,

    PRIMARY KEY (`user_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `invoice_code` VARCHAR(191) NOT NULL,
    `transfer_proof` VARCHAR(191) NULL,
    `status` ENUM('unpaid', 'pending', 'success', 'cancelled') NOT NULL DEFAULT 'unpaid',
    `paid_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `career_histories` ADD CONSTRAINT `career_histories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certifications` ADD CONSTRAINT `certifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educations` ADD CONSTRAINT `educations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_developer_id_fkey` FOREIGN KEY (`developer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_assessments` ADD CONSTRAINT `skill_assessments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_assessments` ADD CONSTRAINT `skill_assessments_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
