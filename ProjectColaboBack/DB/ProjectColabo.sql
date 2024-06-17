SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `github` varchar(255) NOT NULL,
  `linkedin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_creacion` datetime NOT NULL,
  `creador_id` int(11),
  `githubproj` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`),
  ADD FOREIGN KEY (`creador_id`) REFERENCES `estudiantes`(`id`);

ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

CREATE TABLE `estudiantes_proyectos` (
  `estudiante_id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `estudiantes_proyectos`
  ADD PRIMARY KEY (`estudiante_id`,`proyecto_id`),
  ADD KEY `proyecto_id` (`proyecto_id`),
  ADD CONSTRAINT `estudiantes_proyectos_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `estudiantes_proyectos_ibfk_2` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`);

COMMIT;