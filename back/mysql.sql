CREATE SCHEMA `garage`;

CREATE TABLE `garage`.`cars` (
  `idcars` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `brand` VARCHAR(100) NULL,
  `model` VARCHAR(45) NULL,
  `year` INT NULL,
  `price` FLOAT NULL DEFAULT 0,
  `description` VARCHAR(1000) NULL,
  `secondhand` VARCHAR(45) NULL DEFAULT 'no',
  `km` FLOAT NULL DEFAULT 0,
  `co2` FLOAT NULL DEFAULT 0,
  `fuel` VARCHAR(45) NULL,
  `transmission` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `nb_places` VARCHAR(45) NULL,
  `DIN_power` INT NULL DEFAULT 0,
  PRIMARY KEY (`idcars`));

CREATE TABLE `garage`.`employee` (
  `idemployee` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NULL DEFAULT 'employee',
  `name` VARCHAR(45) NULL,
  `fam_name` VARCHAR(45) NULL,
  `birth` VARCHAR(45) NULL,
  `adress` VARCHAR(250) NULL,
  `zipcode` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `social_security` VARCHAR(45) NULL,
  `gender` VARCHAR(45) NULL,
  `picture` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'employed',
  `created` DATE NULL,
  `updated` VARCHAR(100) NULL,
  `pay` FLOAT NULL DEFAULT 1747.20,
  `grade` VARCHAR(45) NULL DEFAULT 'regular',
  PRIMARY KEY (`idemployee`));

CREATE TABLE `garage`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `acc_name` VARCHAR(100) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `name` VARCHAR(45) NULL,
  `fam_name` VARCHAR(45) NULL,
  `avatar` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`));

CREATE TABLE `garage`.`reviews` (
  `iduser` INT NOT NULL,
  `idcars` INT NOT NULL,
  `review` VARCHAR(2000) NULL,
  `note` INT NULL,
  PRIMARY KEY (`iduser`, `idcars`),
  INDEX `idcars_idx` (`idcars` ASC) VISIBLE,
  CONSTRAINT `idcars`
    FOREIGN KEY (`idcars`)
    REFERENCES `garage`.`cars` (`idcars`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `iduser`
    FOREIGN KEY (`iduser`)
    REFERENCES `garage`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `garage`.`reviews` 
DROP FOREIGN KEY `iduser`;
ALTER TABLE `garage`.`reviews` 
ADD CONSTRAINT `iduser`
  FOREIGN KEY (`iduser`)
  REFERENCES `garage`.`user` (`iduser`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `garage`.`reviews` 
DROP FOREIGN KEY `idcars`;
ALTER TABLE `garage`.`reviews` 
ADD CONSTRAINT `idcars`
  FOREIGN KEY (`idcars`)
  REFERENCES `garage`.`cars` (`idcars`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `garage`.`employee` 
ADD COLUMN `email` VARCHAR(45) NULL AFTER `grade`,
ADD COLUMN `password` VARCHAR(255) NULL AFTER `email`;

ALTER TABLE `garage`.`employee` 
CHANGE COLUMN `role` `role` VARCHAR(10) NULL DEFAULT 'employee' ,
CHANGE COLUMN `adress` `adress` VARCHAR(500) NULL DEFAULT NULL ,
CHANGE COLUMN `zipcode` `zipcode` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `gender` `gender` VARCHAR(2) NULL DEFAULT NULL ,
CHANGE COLUMN `picture` `picture` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `status` `status` VARCHAR(100) NULL DEFAULT 'employed' ,
CHANGE COLUMN `grade` `grade` VARCHAR(10) NULL DEFAULT 'regular' ,
CHANGE COLUMN `email` `email` VARCHAR(80) NULL DEFAULT NULL ;
CHANGE COLUMN `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;