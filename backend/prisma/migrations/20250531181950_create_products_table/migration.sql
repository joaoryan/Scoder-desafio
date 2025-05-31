-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `description` VARCHAR(191) NULL,
    `sales` INTEGER NOT NULL DEFAULT 0,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastupdateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
