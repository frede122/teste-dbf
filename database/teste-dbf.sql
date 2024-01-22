-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.33 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para teste-dbf
DROP DATABASE IF EXISTS `teste-dbf`;
CREATE DATABASE IF NOT EXISTS `teste-dbf` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `teste-dbf`;

-- Copiando estrutura para tabela teste-dbf.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela teste-dbf.categories: ~3 rows (aproximadamente)
DELETE FROM `categories`;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `active`) VALUES
	(1, 'Frutas', 1),
	(2, 'Verduras', 1),
	(3, 'Limpeza', 0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Copiando estrutura para tabela teste-dbf.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `value` decimal(12,2) NOT NULL DEFAULT '0.00',
  `image_path` varchar(300) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`category_id`),
  KEY `fk_products_category_idx` (`category_id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela teste-dbf.products: ~5 rows (aproximadamente)
DELETE FROM `products`;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `description`, `value`, `image_path`, `category_id`) VALUES
	(13, 'Maçã', 'A maçã é uma fruta popular que é cultivada em todo o mundo. É o fruto da macieira, uma árvore da família Rosaceae. As maçãs são redondas ou ovaladas, com uma casca lisa e uma polpa suculenta. O sabor das maçãs pode variar de doce a azedo, dependendo da variedade.\n\nAs maçãs são uma boa fonte de vitaminas e minerais, incluindo vitamina C, vitamina K, fibras e potássio. Elas também são uma boa fonte de antioxidantes, que podem ajudar a proteger as células contra danos.', 2.56, 'storage/maca.png', 1),
	(14, 'Banana', 'A banana é uma fruta popular que é cultivada em todo o mundo. É o fruto da bananeira, uma planta herbácea vivaz acaule da família Musaceae. As bananas são cultivadas em 130 países, com o Brasil sendo o quarto maior produtor, com 6,6 milhões de toneladas produzidas em 455 mil hectares.\nAs bananas têm um formato alongado, com uma casca lisa e uma polpa suculenta. O sabor das bananas pode variar de doce a azedo, dependendo da variedade. ', 1.23, 'storage/banana.png', 1),
	(15, 'Uva', 'A uva é uma fruta de origem asiática, que é cultivada em todo o mundo. É o fruto da videira, uma planta trepadeira da família das Vitaceae. As uvas são uma fruta popular, que pode ser consumida fresca, seca, ou usada na produção de vinho, suco, geleia e outras bebidas e alimentos.', 2.32, 'storage/uva.png', 1),
	(16, 'Alface', 'A alface é uma hortaliça folhosa, anual ou bienal, utilizada na alimentação humana desde cerca de 500 a.C.. Originária do Leste do Mediterrâneo, é mundialmente cultivada para o consumo em saladas, com inúmeras variedades de folhas, cores, formatos, tamanhos e texturas.', 0.85, 'storage/alface.png', 2),
	(17, 'Repolho', 'O repolho é uma hortaliça crucífera, ou seja, da mesma família da couve, do brócolis e da couve-flor. É uma planta anual, de origem asiática, que é cultivada em todo o mundo. O repolho tem um formato arredondado, com folhas lisas ou enrugadas, que formam uma cabeça compacta. A cor do repolho pode variar do verde ao roxo, dependendo da variedade.', 2.89, 'storage/repolho.png', 2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
