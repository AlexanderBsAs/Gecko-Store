-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: geekco_storedb2.0
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,4,'Argentina','Buenos Aires','La Plata','Calle 123','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,6,'Argentina','Córdoba','Córdoba','Avenida 456','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,3,'Argentina','Santa Fe','Rosario','Calle 789','2024-02-28 21:25:16','2024-02-28 21:25:16'),(4,2,'Argentina','Mendoza','Mendoza','Avenida 012','2024-02-28 21:25:16','2024-02-28 21:25:16'),(5,7,'Argentina','Salta','Salta','Calle 345','2024-02-28 21:25:16','2024-02-28 21:25:16'),(6,1,'Argentina','Buenos Aires','Mar del Plata','Calle San Martín #234','2024-02-28 21:25:16','2024-02-28 21:25:16'),(7,9,'Argentina','Misiones','Posadas','Avenida Uruguay #567','2024-02-28 21:25:16','2024-02-28 21:25:16'),(8,10,'Argentina','Chubut','Comodoro Rivadavia','Calle Rivadavia #890','2024-02-28 21:25:16','2024-02-28 21:25:16'),(9,8,'Argentina','Tucumán','San Miguel de Tucumán','Avenida Belgrano #1234','2024-02-28 21:25:16','2024-02-28 21:25:16'),(10,5,'Argentina','Corrientes','Corrientes','Calle Junín #5678','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'DC','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,'LEGO','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,'Nintendo','2024-02-28 21:25:16','2024-02-28 21:25:16'),(4,'PlayStation','2024-02-28 21:25:16','2024-02-28 21:25:16'),(5,'Nerf','2024-02-28 21:25:16','2024-02-28 21:25:16'),(6,'Xbox','2024-02-28 21:25:16','2024-02-28 21:25:16'),(7,'Marvel','2024-02-28 21:25:16','2024-02-28 21:25:16'),(8,'Hasbro','2024-02-28 21:25:16','2024-02-28 21:25:16'),(9,'Mattel','2024-02-28 21:25:16','2024-02-28 21:25:16'),(10,'Disney','2024-02-28 21:25:16','2024-02-28 21:25:16'),(11,'Sony','2024-02-28 21:25:16','2024-02-28 21:25:16'),(12,'Ubisoft','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `statuses_id` int NOT NULL,
  `user_id` int NOT NULL,
  `total` int NOT NULL,
  `products_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `statuses_id` (`statuses_id`),
  KEY `user_id` (`user_id`),
  KEY `products_id` (`products_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`statuses_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_ibfk_3` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Toy','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,'Video Game','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,'Console','2024-02-28 21:25:16','2024-02-28 21:25:16'),(4,'Accessory','2024-02-28 21:25:16','2024-02-28 21:25:16'),(5,'Board Game','2024-02-28 21:25:16','2024-02-28 21:25:16'),(6,'Figuras','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'Ps4','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,'PC','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,'PlayStation','2024-02-28 21:25:16','2024-02-28 21:25:16'),(4,'Nintendo Switch','2024-02-28 21:25:16','2024-02-28 21:25:16'),(5,'Nintendo 3DS','2024-02-28 21:25:16','2024-02-28 21:25:16'),(6,'Xbox','2024-02-28 21:25:16','2024-02-28 21:25:16'),(7,'Android','2024-02-28 21:25:16','2024-02-28 21:25:16'),(8,'iOS','2024-02-28 21:25:16','2024-02-28 21:25:16'),(9,'Xbox Series X','2024-02-28 21:25:16','2024-02-28 21:25:16'),(10,'PlayStation 5','2024-02-28 21:25:16','2024-02-28 21:25:16'),(11,'Nintendo Wii','2024-02-28 21:25:16','2024-02-28 21:25:16'),(12,'PC Gaming','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `price` int NOT NULL,
  `installments` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `platform_id` int DEFAULT NULL,
  `category_id` int NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `platform_id` (`platform_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Halo Master Chief','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',5234,NULL,5,4,1,1,60,'halo-1.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,'Batman','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',9241,3,NULL,11,1,1,40,'batman.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,'He man','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',5142,NULL,10,12,1,1,35,'heman.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(4,'Dethsroke','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',6518,NULL,2,11,2,1,45,'dethstroke.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(5,'Freddy','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',7132,NULL,2,11,2,1,20,'freddy.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(6,'Hollow Knight','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',5956,NULL,5,12,3,2,100,'hollow.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(7,'Consola PlayStation 4','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',5893,6,10,4,NULL,2,80,'ps4.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(8,'Assassins Creed: Odyssey','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore beatae dolorem natus ealaudantium! Excepturi, quaerat.',4130,NULL,5,12,2,2,70,'assassinody.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(9,'FIFA 22','The latest installment in the FIFA video game series.',6113,NULL,4,4,3,2,50,'fifa_22.jfif','2024-02-28 21:25:16','2024-02-28 21:25:16'),(10,'Nintendo Switch Lite','A compact, lightweight Nintendo Switch for handheld gaming.',4796,12,10,3,4,3,40,'switch_lite.webp','2024-02-28 21:25:16','2024-02-28 21:25:16'),(11,'Red Dead Redemption 2','Immerse yourself in the Wild West with this action-adventure game.',8660,12,5,12,3,2,35,'red_dead_redemption_2.webp','2024-02-28 21:25:16','2024-02-28 21:25:16'),(12,'Assassin\'s Creed Valhalla','Embark on a Viking journey in this action RPG.',7591,12,10,12,6,2,45,'assassins_creed_valhalla.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(13,'LEGO Technic Bugatti Chiron','Build a detailed model of the Bugatti Chiron supercar.',6308,12,10,2,NULL,1,10,'lego_bugatti_chiron.jfif','2024-02-28 21:25:16','2024-02-28 21:25:16'),(14,'Call of Duty: Warzone','A free-to-play battle royale game with intense combat.',7251,6,5,12,2,2,100,'warzone.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(15,'Hot Wheels Track Builder Set','Create thrilling Hot Wheels tracks with this set.',7771,NULL,3,8,NULL,1,80,'hot_wheels_track_builder.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(16,'Minecraft','Explore and build in the blocky world of Minecraft.',5184,3,2,12,2,2,70,'minecraft.png','2024-02-28 21:25:16','2024-02-28 21:25:16'),(17,'PlayStation 5 DualSense Controller','Experience immersive gaming with the PS5 controller.',5699,6,4,4,3,4,50,'ps5_controller.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(18,'Nerf Elite Fortnite AR-L Blaster','Replica of the Fortnite blaster for Nerf battles.',8309,NULL,4,5,NULL,1,60,'nerf_fortnite_blaster.webp','2024-02-28 21:25:16','2024-02-28 21:25:16'),(19,'Nintendo 3DS XL','Portable gaming with 3D visuals and a larger screen.',7251,NULL,10,3,5,3,20,'nintendo_3ds_xl.jfif','2024-02-28 21:25:16','2024-02-28 21:25:16'),(20,'Monopoly Board Game','Classic Monopoly board game for family fun.',7771,NULL,5,8,NULL,5,40,'monopoly_board_game.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(21,'Pokémon Sword and Shield','Embark on a Pokémon journey in the Galar region.',7591,NULL,5,3,4,2,60,'pokemon_sword_shield.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(22,'LEGO Star Wars Millennium Falcon','Build the iconic Millennium Falcon with LEGO bricks.',6308,NULL,5,2,NULL,1,15,'lego_millennium_falcon.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(23,'PlayStation VR Bundle','Immersive virtual reality experience for PlayStation.',8633,12,10,4,3,4,25,'psvr_bundle.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(24,'Transformers Optimus Prime Action Figure','Collectible action figure of the Autobot leader.',7251,3,10,9,NULL,1,30,'optimus_prime_figure.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(25,'Madden NFL 22','Experience the excitement of NFL football in Madden 22.',5804,3,NULL,4,6,2,50,'madden_nfl_22.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(26,'LEGO Technic Porsche 911 GT3 RS','Build a detailed model of the Porsche 911 GT3 RS.',7591,12,NULL,2,NULL,1,10,'lego_porsche_911_gt3_rs.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(27,'Xbox Wireless Controller','Official Xbox wireless controller for gaming.',8145,NULL,6,6,6,4,40,'xbox_controller.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(28,'Dungeons & Dragons Starter Set','Begin your journey into the world of Dungeons & Dragons.',6547,3,NULL,7,NULL,5,25,'dnd_starter_set.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(29,'Nintendo Switch Pro Controller','High-performance controller for the Nintendo Switch.',6141,6,6,3,4,4,30,'switch_pro_controller.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(30,'Figura pikachu','Figura pikachu oficial',10000,6,25,3,6,6,12,'image-1705874605783.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'user','2024-02-28 21:25:15','2024-02-28 21:25:15'),(2,'admin','2024-02-28 21:25:15','2024-02-28 21:25:15');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240228054140-create-rol.js'),('20240228054240-create-user.js'),('20240228054828-create-address.js'),('20240228055348-create-status.js'),('20240228055954-create-platform.js'),('20240228060016-create-brand.js'),('20240228060031-create-category.js'),('20240228060429-create-product.js'),('20240228060838-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'Processing','2024-02-28 21:25:16','2024-02-28 21:25:16'),(2,'In transit','2024-02-28 21:25:16','2024-02-28 21:25:16'),(3,'Completed','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` datetime NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,'Liliana','Almirón','lili.49_@outlook.com','1995-05-15 00:00:00','$2a$10$gN0Y9thnm2ZNV22xOWrQ8eYZeaVX.erl.GKEWgWYZEs/rnP5kLqp2','image-1705961748418.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(2,2,'Gabriel','Robles','gaby_robles@outlook.com','1990-05-15 00:00:00','$2a$10$.BO62gxgBeAbIqlTliyxz.AzVwKC1XEtFR241g//tdXDxE7BsZ.a.','gatopan.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(3,2,'Alejandro','Vera','ale_vera@outlook.com','1988-08-20 00:00:00','$2a$10$fE2uLPZhJfX/N2iL8fZfluFgMwxfxT7v9dQ4jQtGXs2/DOiMA5NaS','gatopan.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(4,2,'Fernando','Ortiz','fer_ortiz@outlook.com','1975-03-10 00:00:00','$2a$10$l9rZsDw3hB7/V9fmMsfo7uz7MzNgh9HlvfRd4JNXAD67mbpRD4M3W','gatopan.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(5,2,'Alexander','Ureta','alex_ureta@outlook.com','1982-11-28 00:00:00','$2a$10$.u./1Wvdx20RftzTrzSsqOz0LGxtQtowsUxJYx2DfJm2VoB/eS.KS','gatopan.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(6,1,'Kipper','Durrad','kdurrad5@nbcnews.com','1978-09-03 00:00:00','$2a$10$p455gayH6ocogXS/YX8aFeOfdYYy38jtpJ63tZ6IyoeRcL6vC6d.u','gatopan.jpg','2024-02-28 21:25:15','2024-02-28 21:25:15'),(7,1,'Vincents','Buyers','vbuyers6@seesaa.net','1993-12-17 00:00:00','$2a$10$KwXMdjnNQnAbwCqhFWIITOjYQ4FficVzCB9meqYaNcF6OSHwaF/rG','gatopan.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(8,1,'Lauri','Gilkes','lgilkes7@acquirethisname.com','1986-06-25 00:00:00','$2a$10$juZKndCuQq81cPGRioL9qefogPwzmtbSKtJBepdCERi0DWyB.e9.y','gatopan.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(9,1,'Candi','Peartree','cpeartree8@g.co','1995-02-12 00:00:00','$2a$10$HbdlW0Gqq.gEt/aABXjvk.gYfgLe0ZnfpWNsL6zX/hIF76iudCtaW','gatopan.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16'),(10,1,'Alexi','Mattersley','amattersley9@shareasale.com','1980-07-08 00:00:00','$2a$10$QDfbrbgvT9RVwr/wvnc2P.lx8wrng7Qlxg9Fh85HMHkjxlsIvOJQa','gatopan.jpg','2024-02-28 21:25:16','2024-02-28 21:25:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 22:00:23
