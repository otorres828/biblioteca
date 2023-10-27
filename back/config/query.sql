-- SQLite

DROP TABLE IF EXISTS `tipos`;

CREATE TABLE `tipos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT NOT NULL
);

/*Data for the table `tipos` */

INSERT INTO `tipos`(`id`,`nombre`) VALUES 
(1,'estudiante'),
(2,'profesor'),
(3,'administrativo'),
(4,'empleado'),
(5,'visitante');


/*Table structure for table `abscripciones` */

DROP TABLE IF EXISTS `abscripciones`;

CREATE TABLE `abscripciones` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT NOT NULL
);

/*Data for the table `abscripciones` */

insert  into `abscripciones`(`id`,`nombre`) values 
(1,'Dean'),
(2,'Zackery'),
(3,'Tatum'),
(4,'Isac'),
(5,'Lonnie'),
(6,'Braden'),
(7,'Maida'),
(8,'Romaine'),
(9,'Ellis'),
(10,'Chase');

/*Table structure for table `administradores` */

DROP TABLE IF EXISTS `administradores`;

CREATE TABLE `administradores` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre_completo` TEXT NOT NULL,
  `nick` TEXT NOT NULL UNIQUE,
  `clave` TEXT NOT NULL,
  `estatus` TEXT NOT NULL DEFAULT '1',
  `principal` TEXT NOT NULL DEFAULT '2'
);

/*Data for the table `administradores` */

insert  into `administradores`(`id`,`nombre_completo`,`nick`,`clave`,`estatus`,`principal`) values 
(1,'Oliver Torres','otorres828','$2b$10$3HrOlNp0kC86UO/OWu4u6O1yvkMLfpwgFiZzK4.7jy0SpE3wXb7rq','1','1'),
(2,'jesus','jesusl','$2b$10$cZj7QMyb/aH/bWvZ0y3Ve.KvI8qvAkz9/IoBJbI89r2bNeqHPJUM6','1','2');

/*Table structure for table `carreras` */

DROP TABLE IF EXISTS `carreras`;

CREATE TABLE `carreras` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT NOT NULL
) ;

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



/*Data for the table `historiales` */

DROP TABLE IF EXISTS `permisos`;

CREATE TABLE `permisos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT NOT NULL
);
/*Data for the table `permisos` */

/*Table structure for table `permisos` */

insert  into `permisos`(`id`,`nombre`) values 
(1,'control-de-acceso'),
(2,'estadisticas'),
(3,'historial'),
(4,'usuarios'),
(5,'visitantes'),
(6,'acceso-manual'),
(7,'administrador');



/*Table structure for table `permiso_administrador` */

DROP TABLE IF EXISTS `permiso_administrador`;

CREATE TABLE `permiso_administrador` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `permiso_id` INTEGER unsigned DEFAULT NULL,
  `administrador_id` INTEGER unsigned DEFAULT NULL,
  KEY `permiso_administrador_permiso_id_foreign` (`permiso_id`),
  KEY `permiso_administrador_administrador_id_foreign` (`administrador_id`),
  CONSTRAINT `permiso_administrador_administrador_id_foreign` FOREIGN KEY (`administrador_id`) REFERENCES `administradores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permiso_administrador_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

/*Data for the table `permiso_administrador` */

insert  into `permiso_administrador`(`id`,`permiso_id`,`administrador_id`) values 
(1,1,1),
(2,4,1),
(3,7,1),
(4,3,1),
(5,2,1),
(6,6,1),
(7,5,1),
(8,1,2),
(9,6,2),
(12,1,3),
(13,6,3),
(14,4,3),
(15,5,3);




/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `cedula` bigint(20) unsigned NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `detalles` text DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estatus` enum('1','2') NOT NULL DEFAULT '1',
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`cedula`,`nombres`,`apellidos`,`detalles`,`correo`,`telefono`,`estatus`,`avatar`) values 
(123,'euclides','matacho','relevante','caltaoca@gmail.com','041477757','1',NULL),
(19111127,'Camila Andrea','Marchan Mendez','estudiante problematico','camila@est.ucab.edu.ve','04148899037','1','/1.jpg'),
(25859600,'OLIVER','TORRES','','oatorres.19@est.ucab.edu.ve','04148848537','1',NULL),
(26269828,'Oliver Andres','Torres Rivero','no entroego libro','oatorres.19@est.ucab.edu.ve','04148848537','2','/2.jpg');




/*Table structure for table `tarjetas` */

DROP TABLE IF EXISTS `tarjetas`;

CREATE TABLE `tarjetas` (
  `iCardCode` bigint(20) unsigned NOT NULL,
  `iSiteCode` varchar(255) NOT NULL,
  `estatus` enum('1','2') NOT NULL DEFAULT '1',
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
-- Crea la tabla `tarjetas`

INSERT INTO tarjetas (iCardCode, iSiteCode, estatus, cedula, tipo_id, carrera_id, abscripcion_id)
VALUES
(10900, '573', 1, 25859600, 5, NULL, NULL),
(26954, '741', 1, 26269828, 3, 5, 8),
(39427, '864', 1, 19111127, 2, 6, 1),
(48722, '612', 1, 123, 5, NULL, NULL);

npx sequelize migration:generate --name create-abscripciones
DROP TABLE IF EXISTS `historiales`;

CREATE TABLE `historiales` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tarjeta_id` bigint(20) unsigned DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipo_id` bigint(20) unsigned DEFAULT NULL,
  `carrera_id` bigint(20) unsigned DEFAULT NULL,
  `abscripcion_id` bigint(20) unsigned DEFAULT NULL,
  `tipo` enum('1','2') NOT NULL DEFAULT '1',
  `estatus` enum('1','2','3') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `historiales_tipo_id_foreign` (`tipo_id`),
  KEY `historiales_carrera_id_foreign` (`carrera_id`),
  KEY `historiales_abscripcion_id_foreign` (`abscripcion_id`),
  KEY `historiales_tarjeta_id_foreign` (`tarjeta_id`),
  CONSTRAINT `historiales_abscripcion_id_foreign` FOREIGN KEY (`abscripcion_id`) REFERENCES `abscripciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_carrera_id_foreign` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_tarjeta_id_foreign` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`iCardCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historiales_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ;