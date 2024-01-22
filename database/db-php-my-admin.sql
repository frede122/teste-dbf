-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/01/2024 às 21:40
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `teste-dbf`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `active`) VALUES
(1, 'Frutas', 1),
(2, 'Verduras', 1),
(3, 'Limpeza', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `value` decimal(12,2) NOT NULL DEFAULT 0.00,
  `image_path` varchar(300) DEFAULT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `value`, `image_path`, `category_id`) VALUES
(13, 'Maçã', 'A maçã é uma fruta popular que é cultivada em todo o mundo. É o fruto da macieira, uma árvore da família Rosaceae. As maçãs são redondas ou ovaladas, com uma casca lisa e uma polpa suculenta. O sabor das maçãs pode variar de doce a azedo, dependendo da variedade.\n\nAs maçãs são uma boa fonte de vitaminas e minerais, incluindo vitamina C, vitamina K, fibras e potássio. Elas também são uma boa fonte de antioxidantes, que podem ajudar a proteger as células contra danos.', 2.56, 'storage/maca.png', 1),
(14, 'Banana', 'A banana é uma fruta popular que é cultivada em todo o mundo. É o fruto da bananeira, uma planta herbácea vivaz acaule da família Musaceae. As bananas são cultivadas em 130 países, com o Brasil sendo o quarto maior produtor, com 6,6 milhões de toneladas produzidas em 455 mil hectares.\nAs bananas têm um formato alongado, com uma casca lisa e uma polpa suculenta. O sabor das bananas pode variar de doce a azedo, dependendo da variedade. ', 1.23, 'storage/banana.png', 1),
(15, 'Uva', 'A uva é uma fruta de origem asiática, que é cultivada em todo o mundo. É o fruto da videira, uma planta trepadeira da família das Vitaceae. As uvas são uma fruta popular, que pode ser consumida fresca, seca, ou usada na produção de vinho, suco, geleia e outras bebidas e alimentos.', 2.32, 'storage/uva.png', 1),
(16, 'Alface', 'A alface é uma hortaliça folhosa, anual ou bienal, utilizada na alimentação humana desde cerca de 500 a.C.. Originária do Leste do Mediterrâneo, é mundialmente cultivada para o consumo em saladas, com inúmeras variedades de folhas, cores, formatos, tamanhos e texturas.', 0.85, 'storage/alface.png', 2),
(17, 'Repolho', 'O repolho é uma hortaliça crucífera, ou seja, da mesma família da couve, do brócolis e da couve-flor. É uma planta anual, de origem asiática, que é cultivada em todo o mundo. O repolho tem um formato arredondado, com folhas lisas ou enrugadas, que formam uma cabeça compacta. A cor do repolho pode variar do verde ao roxo, dependendo da variedade.', 2.89, 'storage/repolho.png', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`,`category_id`),
  ADD KEY `fk_products_category_idx` (`category_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
