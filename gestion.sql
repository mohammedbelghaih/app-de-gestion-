-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 04 Mai 2020 à 16:40
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `gestion`
--

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(50) DEFAULT NULL,
  `tel` int(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id`, `name`, `tel`, `email`) VALUES
(1, 'ch3aiba', 99999999, 'a@a.com'),
(33, 'hmadi', 19, 'frfrfr@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `products_id` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `id_rayon` int(11) DEFAULT NULL,
  `id_f` int(11) DEFAULT NULL,
  PRIMARY KEY (`products_id`),
  KEY `id_rayon` (`id_rayon`),
  KEY `id_f` (`id_f`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `products`
--

INSERT INTO `products` (`products_id`, `quantity`, `unit_price`, `product_name`, `id_rayon`, `id_f`) VALUES
(1, 142142, 2112, 'pasta', 8, 1),
(23, 1938, 234, 'coufittibnrmok', 20, 33);

-- --------------------------------------------------------

--
-- Structure de la table `rayon`
--

CREATE TABLE IF NOT EXISTS `rayon` (
  `rayon_id` int(11) NOT NULL DEFAULT '0',
  `rayon_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rayon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `rayon`
--

INSERT INTO `rayon` (`rayon_id`, `rayon_name`) VALUES
(8, 'netoyage'),
(20, 'khayzo');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_f`) REFERENCES `fournisseur` (`id`),
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_rayon`) REFERENCES `rayon` (`rayon_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
