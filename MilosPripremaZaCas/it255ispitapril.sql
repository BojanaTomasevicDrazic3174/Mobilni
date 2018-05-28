-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2018 at 09:53 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it255ispitapril`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `ID` int(11) NOT NULL,
  `IME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`ID`, `IME`) VALUES
(1, 'Sammsung'),
(2, 'Nokia'),
(3, 'Lenovo'),
(4, 'Apple');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(128) NOT NULL,
  `LASTNAME` varchar(128) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(256) NOT NULL,
  `TOKEN` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`ID`, `FIRSTNAME`, `LASTNAME`, `USERNAME`, `PASSWORD`, `TOKEN`) VALUES
(1, 'Bojana', 'Tomasevic', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '158173110b810e4a88b5cde444fab20109658829'),
(2, 'Milos', 'Drazic ', 'mikica', 'e10adc3949ba59abbe56e057f20f883e', '4c2618248d2ac1f44d2cc8807cb9e2f2781e15dc'),
(3, 'Toma', 'Tomasevic', 'tomat', '23db733f84f4fbd27c2dd9475f8bf6cf', '5d575ab6cfcbb07c01c57049e5219ec301b8f85c');

-- --------------------------------------------------------

--
-- Table structure for table `mobilni`
--

CREATE TABLE `mobilni` (
  `ID` int(11) NOT NULL,
  `BRAND_ID` int(11) DEFAULT NULL,
  `IME` varchar(128) NOT NULL,
  `CENA` decimal(12,4) NOT NULL,
  `OPIS` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mobilni`
--

INSERT INTO `mobilni` (`ID`, `BRAND_ID`, `IME`, `CENA`, `OPIS`) VALUES
(1, 2, 'g325', '25000.0000', 'kategorija'),
(2, 3, 'b123', '20000.0000', 'kategorija'),
(3, 4, 'x2555', '68000.0000', 'kategorija visoka'),
(4, 3, 'bbbbb', '50000.0000', 'sta god'),
(5, 3, 'Naziv1', '500000.0000', 'Kategorija'),
(6, 1, 'Ime 1', '555555.0000', 'opis3'),
(7, 1, 'Ime3', '99999999.9999', 'Opis4');

-- --------------------------------------------------------

--
-- Table structure for table `porudzbina`
--

CREATE TABLE `porudzbina` (
  `ID` int(11) NOT NULL,
  `KORISNICI_ID` int(11) DEFAULT NULL,
  `MOBILNI_ID` int(11) DEFAULT NULL,
  `DATUM` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `porudzbina`
--

INSERT INTO `porudzbina` (`ID`, `KORISNICI_ID`, `MOBILNI_ID`, `DATUM`) VALUES
(30, NULL, 7, '0000-00-00 00:00:00'),
(31, NULL, 1, '0000-00-00 00:00:00'),
(32, NULL, 1, '0000-00-00 00:00:00'),
(33, NULL, 1, '0000-00-00 00:00:00'),
(34, NULL, 1, '0000-00-00 00:00:00'),
(35, NULL, 1, '0000-00-00 00:00:00'),
(36, NULL, 1, '0000-00-00 00:00:00'),
(37, NULL, 7, '0000-00-00 00:00:00'),
(38, NULL, 1, '0000-00-00 00:00:00'),
(40, 1, 1, '2018-05-19 15:23:19'),
(41, 1, 3, '2018-05-19 15:23:42'),
(42, 1, 7, '2018-05-19 15:24:03'),
(43, 1, 1, '2018-05-19 15:28:23'),
(44, 1, 1, '2018-05-19 15:29:07'),
(45, 1, 1, '2018-05-19 15:29:44'),
(46, 1, 1, '2018-05-19 15:34:48'),
(47, 1, 1, '2018-05-19 15:35:59'),
(48, 1, 1, '2018-05-19 15:36:24'),
(49, 1, 1, '2018-05-19 15:37:10'),
(53, 2, 1, '2018-05-20 09:43:33'),
(54, 2, 1, '2018-05-20 09:43:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `mobilni`
--
ALTER TABLE `mobilni`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RELATIONSHIP_1` (`BRAND_ID`);

--
-- Indexes for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RELATIONSHIP_2` (`KORISNICI_ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`MOBILNI_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `mobilni`
--
ALTER TABLE `mobilni`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `porudzbina`
--
ALTER TABLE `porudzbina`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `mobilni`
--
ALTER TABLE `mobilni`
  ADD CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`BRAND_ID`) REFERENCES `brand` (`ID`);

--
-- Constraints for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`KORISNICI_ID`) REFERENCES `korisnici` (`ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`MOBILNI_ID`) REFERENCES `mobilni` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
