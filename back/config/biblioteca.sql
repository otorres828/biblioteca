/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.24-MariaDB : Database - biblioteca
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `biblioteca`;

/*Table structure for table `abscripciones` */

DROP TABLE IF EXISTS `abscripciones`;

CREATE TABLE `abscripciones` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `abscripciones` */

/*Table structure for table `administradores` */

DROP TABLE IF EXISTS `administradores`;

CREATE TABLE `administradores` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clave` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estatus` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `principal` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `administradores_nick_unique` (`nick`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `administradores` */

insert  into `administradores`(`id`,`nombre_completo`,`nick`,`clave`,`estatus`,`principal`) values 
(1,'Administrador','admin','$2b$10$L7UdBW63/bzjJZF1qxkWeOHswL5u/upNiNCr7MPvUhTZsVNqbc9jy','1','1');

/*Table structure for table `carreras` */

DROP TABLE IF EXISTS `carreras`;

CREATE TABLE `carreras` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `carreras` */

insert  into `carreras`(`id`,`nombre`) values 
(1,'ingenieria en informatica'),
(2,'ingenieria industrial'),
(3,'ingenieria civil'),
(4,'derecho'),
(5,'comunicacion social'),
(6,'administracion de empresas'),
(7,'contaduria publica'),
(8,'relaciones industriales');

/*Table structure for table `historiales` */

DROP TABLE IF EXISTS `historiales`;

CREATE TABLE `historiales` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tarjeta_id` bigint(20) unsigned DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipo_id` bigint(20) unsigned DEFAULT NULL,
  `carrera_id` bigint(20) unsigned DEFAULT NULL,
  `abscripcion_id` bigint(20) unsigned DEFAULT NULL,
  `tipo` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `estatus` enum('1','2','3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `historiales_tipo_id_foreign` (`tipo_id`),
  KEY `historiales_carrera_id_foreign` (`carrera_id`),
  KEY `historiales_abscripcion_id_foreign` (`abscripcion_id`),
  KEY `historiales_tarjeta_id_foreign` (`tarjeta_id`),
  CONSTRAINT `historiales_abscripcion_id_foreign` FOREIGN KEY (`abscripcion_id`) REFERENCES `abscripciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_carrera_id_foreign` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_tarjeta_id_foreign` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`iCardCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20034 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `historiales` */

/*Table structure for table `permiso_administrador` */

DROP TABLE IF EXISTS `permiso_administrador`;

CREATE TABLE `permiso_administrador` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `permiso_id` bigint(20) unsigned DEFAULT NULL,
  `administrador_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permiso_administrador_permiso_id_foreign` (`permiso_id`),
  KEY `permiso_administrador_administrador_id_foreign` (`administrador_id`),
  CONSTRAINT `permiso_administrador_administrador_id_foreign` FOREIGN KEY (`administrador_id`) REFERENCES `administradores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permiso_administrador_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permiso_administrador` */

insert  into `permiso_administrador`(`id`,`permiso_id`,`administrador_id`) values 
(1,2,1),
(2,1,1),
(3,3,1),
(4,4,1),
(5,5,1),
(6,6,1),
(7,7,1);

/*Table structure for table `permisos` */

DROP TABLE IF EXISTS `permisos`;

CREATE TABLE `permisos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permisos` */

insert  into `permisos`(`id`,`nombre`) values 
(1,'control-de-acceso'),
(2,'estadisticas'),
(3,'historial'),
(4,'usuarios'),
(5,'visitantes'),
(6,'acceso-manual'),
(7,'administrador');

/*Table structure for table `tarjetas` */

DROP TABLE IF EXISTS `tarjetas`;

CREATE TABLE `tarjetas` (
  `iCardCode` bigint(20) unsigned NOT NULL,
  `iSiteCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estatus` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `cedula` bigint(20) unsigned DEFAULT NULL,
  `tipo_id` bigint(20) unsigned DEFAULT NULL,
  `carrera_id` bigint(20) unsigned DEFAULT NULL,
  `abscripcion_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`iCardCode`),
  KEY `tarjetas_cedula_foreign` (`cedula`),
  KEY `tarjetas_tipo_id_foreign` (`tipo_id`),
  KEY `tarjetas_carrera_id_foreign` (`carrera_id`),
  KEY `tarjetas_abscripcion_id_foreign` (`abscripcion_id`),
  CONSTRAINT `tarjetas_abscripcion_id_foreign` FOREIGN KEY (`abscripcion_id`) REFERENCES `abscripciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tarjetas_carrera_id_foreign` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tarjetas_cedula_foreign` FOREIGN KEY (`cedula`) REFERENCES `usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tarjetas_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tarjetas` */

/*Table structure for table `tipos` */

DROP TABLE IF EXISTS `tipos`;

CREATE TABLE `tipos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tipos` */

insert  into `tipos`(`id`,`nombre`) values 
(1,'estudiante'),
(2,'profesor'),
(3,'administrativo'),
(4,'empleado'),
(5,'visitante');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `cedula` bigint(20) unsigned NOT NULL,
  `nombres` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalles` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estatus` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `usuarios` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
