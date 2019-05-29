-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: FoodGrouper
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Chat`
--

DROP TABLE IF EXISTS `Chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `userID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  `content` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `Chat_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `User` (`id`),
  CONSTRAINT `Chat_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `Room` (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chat`
--

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dish`
--

DROP TABLE IF EXISTS `Dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant` (`restaurant`),
  CONSTRAINT `Dish_ibfk_1` FOREIGN KEY (`restaurant`) REFERENCES `Restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dish`
--

LOCK TABLES `Dish` WRITE;
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` VALUES (1,3,'Bowl of rice served with Tuna',6000),(2,3,'Bowl of rice served with Meat',6000),(3,3,'Bowl of rice with Salmon',6000),(4,3,'Bowl of rice with Shrimp',6000),(5,3,'Rice with Fish Roe',7000),(6,4,'Fried Chicken',17000),(7,4,'Seasoned Chicken',18000),(8,4,'Soybean seasoned Chicken',18000),(9,5,'Crispy chicken',12000),(10,5,'Seasoned chicken',13000),(11,5,'Chicken only drumstick',14000),(12,5,'garlic seasoned chicken',14000),(13,6,'Gold olive chicken',16000),(14,6,'Half and half chicken',17000),(15,6,'Jamaica chkcien',17500),(16,6,'Smoke chkcien',17000),(17,6,'Seasoned chicken',17000),(18,8,'Cola & Popcorn Chicken',2500),(19,8,'Big colpop',4000),(20,8,'Bburingkle',17000),(21,8,'Bburingkle HOT',18000),(22,8,'Fried chicken',16000),(23,8,'Seasoned chicken',17000),(24,7,'Pizza Slice',5000),(25,7,'Pizza While',25000),(26,7,'Sausage',8000),(27,7,'Cheese Stick',8000),(28,7,'Beer',5000);
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomID` int(11) NOT NULL,
  `dishID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roomID` (`roomID`),
  KEY `dishID` (`dishID`),
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `Room` (`roomID`),
  CONSTRAINT `Order_ibfk_2` FOREIGN KEY (`dishID`) REFERENCES `Dish` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Participants`
--

DROP TABLE IF EXISTS `Participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `roomID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `Participants_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `User` (`id`),
  CONSTRAINT `Participants_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `Room` (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Participants`
--

LOCK TABLES `Participants` WRITE;
/*!40000 ALTER TABLE `Participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `Participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant`
--

DROP TABLE IF EXISTS `Restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `receiveLocation` varchar(20) NOT NULL,
  `minPrice` int(11) NOT NULL,
  `openTime` varchar(16) NOT NULL,
  `closeTime` varchar(16) NOT NULL,
  `openDays` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant`
--

LOCK TABLES `Restaurant` WRITE;
/*!40000 ALTER TABLE `Restaurant` DISABLE KEYS */;
INSERT INTO `Restaurant` VALUES (3,'Maru','0428229281','Anywhere',15000,'12:00','20:00','0123456'),(4,'Big Hand Chicken','0428259229','Anywhere',15000,'16:00','24:00','0123456'),(5,'KeunTong Chicken','0428678292','Anywhere',12000,'16:30','24:00','0123456'),(6,'BBQ','0428639292','Anywhere',12000,'14:00','23:00','023456'),(7,'The Journey Pub','0428610800','Anywhere',15000,'17:00','23:00','0123456'),(8,'BHC','0428615958','Anywhere',12000,'17:00','23:00','0123456');
/*!40000 ALTER TABLE `Restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Room`
--

DROP TABLE IF EXISTS `Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Room` (
  `roomID` int(11) NOT NULL AUTO_INCREMENT,
  `host` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `totalPrice` int(11) NOT NULL DEFAULT '0',
  `orderRestaurant` int(11) NOT NULL,
  `orderComplete` tinyint(1) NOT NULL DEFAULT '0',
  `dorm` int(11) NOT NULL,
  PRIMARY KEY (`roomID`),
  KEY `host` (`host`),
  KEY `ORDER_RESTAURANT` (`orderRestaurant`),
  CONSTRAINT `ORDER_RESTAURANT` FOREIGN KEY (`orderRestaurant`) REFERENCES `Restaurant` (`id`),
  CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`host`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room`
--

LOCK TABLES `Room` WRITE;
/*!40000 ALTER TABLE `Room` DISABLE KEYS */;
/*!40000 ALTER TABLE `Room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'leesh6796','fb8426f20a1d6b12992d0307ebe985a60d376d7cff42105eb42afb53b8e1a6166878b1f10a1ee3ee3ba62ff506c61a00edd4a97771080ee8b6702c7edd174e2f','memorial','01082169122');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-29  5:11:18
