CREATE DATABASE  IF NOT EXISTS `bdmultas2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdmultas2`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bdmultas2
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20240817012704_AgregarTelefonoYObservacionesAMultum','7.0.20'),('20240818052947_AddImagenToMultum','7.0.20'),('20240818055055_AddImagenBase64ToMultum','7.0.20'),('20240818183158_AddMontoMultaToMultum','7.0.20'),('20240820035418_AddCocheraAndEstadoControlVehicular','7.0.20');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `Id_Area` int NOT NULL,
  `Nom_Area` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Cajas'),(2,'Ventas'),(3,'Deposito');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabcomprobante`
--

DROP TABLE IF EXISTS `cabcomprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cabcomprobante` (
  `Id_CabeceraC` int NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `TComprobante` int NOT NULL,
  `MedioPago` varchar(50) DEFAULT NULL,
  `Entidad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_CabeceraC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabcomprobante`
--

LOCK TABLES `cabcomprobante` WRITE;
/*!40000 ALTER TABLE `cabcomprobante` DISABLE KEYS */;
/*!40000 ALTER TABLE `cabcomprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprobante`
--

DROP TABLE IF EXISTS `comprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprobante` (
  `Id_Comprobante` int NOT NULL,
  `Id_CabeceraC` int NOT NULL,
  `Id_DetalleC` int NOT NULL,
  `Id_Multa` int NOT NULL,
  PRIMARY KEY (`Id_Comprobante`),
  KEY `FK__Comproban__Id_Ca__4CA06362` (`Id_CabeceraC`),
  KEY `FK__Comproban__Id_De__4D94879B` (`Id_DetalleC`),
  CONSTRAINT `FK__Comproban__Id_Ca__4CA06362` FOREIGN KEY (`Id_CabeceraC`) REFERENCES `cabcomprobante` (`Id_CabeceraC`),
  CONSTRAINT `FK__Comproban__Id_De__4D94879B` FOREIGN KEY (`Id_DetalleC`) REFERENCES `detcomprobante` (`Id_DetalleC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprobante`
--

LOCK TABLES `comprobante` WRITE;
/*!40000 ALTER TABLE `comprobante` DISABLE KEYS */;
/*!40000 ALTER TABLE `comprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `controlvehicular`
--

DROP TABLE IF EXISTS `controlvehicular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `controlvehicular` (
  `IdControl` int NOT NULL,
  `Placa` varchar(6) DEFAULT NULL,
  `HIngreso` time DEFAULT NULL,
  `HSalida` time DEFAULT NULL,
  `Dia` date DEFAULT NULL,
  `Cochera` int NOT NULL DEFAULT '0',
  `Estado` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`IdControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `controlvehicular`
--

LOCK TABLES `controlvehicular` WRITE;
/*!40000 ALTER TABLE `controlvehicular` DISABLE KEYS */;
INSERT INTO `controlvehicular` VALUES (1,'12321','02:40:00','02:40:00','2024-08-20',1,'ocupado'),(3,'12321','01:55:00','00:00:00','2024-08-20',2,'Ocupado'),(4,'gr1232','02:00:00','00:00:00','2024-08-20',7,'Ocupado'),(5,'12321','02:06:00','00:00:00','2024-08-20',3,'Ocupado'),(6,'asd123','02:43:00','00:00:00','2024-08-20',0,'Ocupado');
/*!40000 ALTER TABLE `controlvehicular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposito` (
  `Id_Deposito` int NOT NULL,
  `NomDeposito` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Id_Personal` int NOT NULL,
  PRIMARY KEY (`Id_Deposito`),
  KEY `FK__Deposito__Id_Per__4E88ABD4` (`Id_Personal`),
  CONSTRAINT `FK__Deposito__Id_Per__4E88ABD4` FOREIGN KEY (`Id_Personal`) REFERENCES `personal` (`Id_Personal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
INSERT INTO `deposito` VALUES (2,'Sede1','chorrilos',2),(3,'sede2','Chorrillos Sur',4);
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detcomprobante`
--

DROP TABLE IF EXISTS `detcomprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detcomprobante` (
  `Id_DetalleC` int NOT NULL,
  `Subtotal` double DEFAULT NULL,
  `Total` double DEFAULT NULL,
  `Vuelto` double DEFAULT NULL,
  PRIMARY KEY (`Id_DetalleC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detcomprobante`
--

LOCK TABLES `detcomprobante` WRITE;
/*!40000 ALTER TABLE `detcomprobante` DISABLE KEYS */;
/*!40000 ALTER TABLE `detcomprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `Id_Empleado` int NOT NULL,
  `Nom_Empleado` varchar(50) DEFAULT NULL,
  `ApellidoP` varchar(50) DEFAULT NULL,
  `ApellidoM` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `FechaIngreso` date DEFAULT NULL,
  `Activo` tinyint unsigned DEFAULT NULL,
  `EstadoCivil` varchar(50) DEFAULT NULL,
  `NroIdentidad` int DEFAULT NULL,
  `IdTipoDoc` int NOT NULL,
  PRIMARY KEY (`Id_Empleado`),
  KEY `FK__Empleado__IdTipo__4F7CD00D` (`IdTipoDoc`),
  CONSTRAINT `FK__Empleado__IdTipo__4F7CD00D` FOREIGN KEY (`IdTipoDoc`) REFERENCES `tipodoc` (`IdTipoDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (2,'Adrian','Rojas','Zevallos','adrianrojas100@gmail.com','982234771','Villa El salvador','2024-07-29',1,'Soltero',70311575,1),(4,'Joaquin','Rojas','Zevallos','joaquin@hotmail.com','924279112','Villa','2024-07-21',1,'Casado',49818198,1),(5,'Alexander','Carbajo','Grados','alexander@gmail.com','987503925','Av. leon 1090','2024-08-05',1,'Soltero',46477810,1),(6,'hugo','vela','hernandez','hugo@gmail.com','987654321','Av. Jorge 123','2024-07-29',1,'soltero',45785207,1);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `IdHorario` int NOT NULL,
  `Id_Empleado` int NOT NULL,
  `Id_Area` int NOT NULL,
  `Lunes` int DEFAULT '0',
  `Martes` int DEFAULT '0',
  `Miercoles` int DEFAULT '0',
  `Jueves` int DEFAULT '0',
  `Viernes` int DEFAULT '0',
  `Sabado` int DEFAULT '0',
  `Domingo` int DEFAULT '0',
  `HIngreso` time DEFAULT '00:00:00',
  `HSalida` time DEFAULT '00:00:00',
  PRIMARY KEY (`IdHorario`),
  KEY `FK__Horarios__Id_Are__5070F446` (`Id_Area`),
  KEY `FK__Horarios__Id_Emp__5165187F` (`Id_Empleado`),
  CONSTRAINT `FK__Horarios__Id_Are__5070F446` FOREIGN KEY (`Id_Area`) REFERENCES `area` (`Id_Area`),
  CONSTRAINT `FK__Horarios__Id_Emp__5165187F` FOREIGN KEY (`Id_Empleado`) REFERENCES `empleado` (`Id_Empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,2,1,1,1,1,0,0,0,0,'08:00:00','15:00:00'),(2,2,2,1,1,1,0,0,0,0,'08:00:00','15:00:00'),(3,4,1,0,0,0,0,0,0,0,'00:00:00','00:00:00');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infraccion`
--

DROP TABLE IF EXISTS `infraccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infraccion` (
  `Id_Infraccion` int NOT NULL,
  `Nom_Infraccion` varchar(50) DEFAULT NULL,
  `Descripcion` longtext,
  `Resolucion` varchar(50) DEFAULT NULL,
  `Rango` varchar(1) DEFAULT NULL,
  `Monto` double DEFAULT NULL,
  PRIMARY KEY (`Id_Infraccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infraccion`
--

LOCK TABLES `infraccion` WRITE;
/*!40000 ALTER TABLE `infraccion` DISABLE KEYS */;
INSERT INTO `infraccion` VALUES (2,'mul033','zona rigida','sad','d',2),(4,'Multita','mal estacionamiento ','magisterial','L',5),(6,'multota','por estar estacionado mal','magisterial','L',5),(8,'Multit','por estar estacionado mal','magisterial','L',1),(10,'Mul123','nueva ley','sad','d',2);
/*!40000 ALTER TABLE `infraccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multa`
--

DROP TABLE IF EXISTS `multa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multa` (
  `Id_Multa` int NOT NULL AUTO_INCREMENT,
  `FecMulta` date DEFAULT NULL,
  `HoraMulta` time DEFAULT NULL,
  `LugarMulta` varchar(50) DEFAULT NULL,
  `DistritoMulta` varchar(50) DEFAULT NULL,
  `Nro_Serie` varchar(20) DEFAULT NULL,
  `Placa` varchar(6) DEFAULT NULL,
  `Marca` varchar(20) DEFAULT NULL,
  `Modelo` varchar(20) DEFAULT NULL,
  `NMotor` varchar(17) DEFAULT NULL,
  `Año` int DEFAULT NULL,
  `Color` varchar(20) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `Propietario` varchar(80) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Direcion` varchar(100) DEFAULT NULL,
  `Grua` varchar(50) DEFAULT NULL,
  `Id_Deposito` int NOT NULL,
  `Id_Infraccion` int NOT NULL,
  `Id_Personal` int NOT NULL,
  `EstPago` varchar(5) DEFAULT NULL,
  `CodPago` varchar(30) DEFAULT NULL,
  `Telefono` int NOT NULL DEFAULT '0',
  `Observaciones` longtext,
  `ImagenBase64` longtext,
  `MontoMulta` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`Id_Multa`),
  KEY `FK__Multa__Id_Deposi__52593CB8` (`Id_Deposito`),
  KEY `FK__Multa__Id_Infrac__534D60F1` (`Id_Infraccion`),
  KEY `FK__Multa__Id_Person__5441852A` (`Id_Personal`),
  CONSTRAINT `FK__Multa__Id_Deposi__52593CB8` FOREIGN KEY (`Id_Deposito`) REFERENCES `deposito` (`Id_Deposito`),
  CONSTRAINT `FK__Multa__Id_Infrac__534D60F1` FOREIGN KEY (`Id_Infraccion`) REFERENCES `infraccion` (`Id_Infraccion`),
  CONSTRAINT `FK__Multa__Id_Person__5441852A` FOREIGN KEY (`Id_Personal`) REFERENCES `personal` (`Id_Personal`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multa`
--

LOCK TABLES `multa` WRITE;
/*!40000 ALTER TABLE `multa` DISABLE KEYS */;
INSERT INTO `multa` VALUES (1,'2024-12-12','14:30:00','Av. Principal','chorrillos','MUL6385953992','ABC123','Toyota','Corolla','NMTR12345',2020,'Rojo','Activo','Alexander','alexander@gmail.com','Av. Jorge Chavez Mz 17 Lt 19 Buenos Aires De Villa Chorrillos','Si',2,4,3,'P','CP6385959543',987654321,'Sin observaciones',NULL,150.00),(2,'2024-12-11','10:45:00','Calle Secundaria','chorrillos','MUL6385958643','XYZ789','Nissan','Sentra','NMTR67890',2018,'Negro','Inactivo','Alexander','alexander@gmail.com','Av. Jorge Chavez Mz 17 Lt 19 Buenos Aires De Villa Chorrillos','Si',2,4,3,'NP','CP6385959922',123456789,'Vehículo obstruyendo vía',NULL,200.50),(3,'2024-12-10','09:15:00','Plaza Central','chorrillos','MUL6385959543','LMN456','Honda','Civic','NMTR34567',2019,'Blanco','Activo','Alexander','alexander@gmail.com','Av. Jorge Chavez Mz 17 Lt 19 Buenos Aires De Villa Chorrillos','Si',2,4,3,'NP','CP6385960741',555555555,'Estacionamiento indebido',NULL,250.00),(4,'2024-12-09','16:00:00','Zona Industrial','chorrillos','MUL6385959922','OPQ789','Mazda','3','NMTR89012',2021,'Azul','Inactivo','carlos','carlos@gmail.com','Jirón Justo Pastor Dávila 285','Si',2,2,3,'NP','CP6385961719',444444444,'Conducción peligrosa',NULL,300.75),(5,'2024-12-08','12:30:00','Parque Principal','chorrillos','MUL6385960741','RST123','Chevrolet','Spark','NMTR56789',2017,'Gris','Activo','carlos','carlos@gmail.com','Jirón Justo Pastor Dávila 285','Si',2,2,3,'NP','CP6386800576',333333333,'Bloqueo de rampa',NULL,175.25);
/*!40000 ALTER TABLE `multa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal` (
  `Id_Personal` int NOT NULL,
  `Id_Empleado` int NOT NULL,
  `Id_Area` int NOT NULL,
  `UsuarioAcceso` varchar(50) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Personal`),
  KEY `FK__Personal__Id_Are__5535A963` (`Id_Area`),
  KEY `FK__Personal__Id_Emp__5629CD9C` (`Id_Empleado`),
  CONSTRAINT `FK__Personal__Id_Are__5535A963` FOREIGN KEY (`Id_Area`) REFERENCES `area` (`Id_Area`),
  CONSTRAINT `FK__Personal__Id_Emp__5629CD9C` FOREIGN KEY (`Id_Empleado`) REFERENCES `empleado` (`Id_Empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (2,2,1,'EdRojas','c23ad6f18412014673b2d04794ca038ef6767fe94afe408dffb775362fe07e68'),(3,4,2,'Joa','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'),(4,2,1,'ElVenao','c8cdf720db5562a039be5d81c51a07c5120eaf0bf142b2144f1a1eb7a95678d3'),(5,2,1,'Citra','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),(6,2,3,'Coco','4f682b71153ffa91e608445d7ea1257e2076d0d95eab6336cd1aa94b49680f11'),(7,6,3,'HugoDep','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodoc`
--

DROP TABLE IF EXISTS `tipodoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodoc` (
  `IdTipoDoc` int NOT NULL,
  `Descripcion` varchar(50) DEFAULT NULL,
  `Num_Identifica` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IdTipoDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodoc`
--

LOCK TABLES `tipodoc` WRITE;
/*!40000 ALTER TABLE `tipodoc` DISABLE KEYS */;
INSERT INTO `tipodoc` VALUES (1,'DNI','8'),(2,'RUC','10'),(3,'Pasaporte','10'),(4,'CE','12');
/*!40000 ALTER TABLE `tipodoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id_Usuario` int NOT NULL AUTO_INCREMENT,
  `NombreU` varchar(50) DEFAULT NULL,
  `ApellidoU` varchar(50) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'juan','tapia','leo 123','789789789','alexander1@gmail.com',NULL),(2,'Lolapo','Rojas','av revolcuion','2687709','adrian@gmail.com','123456'),(4,'Alexander Javier','Carbajo Grados','Av. Leon 1090','987654321','alexander@gmail.com','123456'),(5,'carlos','cabrera','av leon','987654321','carlos@gmail.com','123456'),(6,'carlos','flores','leon 123','999999999','carlos.flores@gmail.com','123456'),(8,'Lolapo','Carbajo','av Jorge Chavez','999999999','lolapo@gmail.com','123456'),(9,'pachuco','Rojas','av revolcuion','2687709','adrian@gmail.com','123456'),(10,'hugo','carbajo','calle 123','999888777','hugo@gmail.com','123456'),(11,'juam','Gonzales','actualizada 234','333444555','alexander.carbajogrados@gmail.com','123456'),(12,'Luis','Pizarro','Av marbella','987654321','luis@gmail.com','123456');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehinfractor`
--

DROP TABLE IF EXISTS `vehinfractor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehinfractor` (
  `IdVehInfractor` int NOT NULL,
  `Placa` varchar(6) DEFAULT NULL,
  `Marca` varchar(20) DEFAULT NULL,
  `Modelo` varchar(20) DEFAULT NULL,
  `NMotor` varchar(17) DEFAULT NULL,
  `Año` int DEFAULT NULL,
  `Color` varchar(20) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IdVehInfractor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehinfractor`
--

LOCK TABLES `vehinfractor` WRITE;
/*!40000 ALTER TABLE `vehinfractor` DISABLE KEYS */;
INSERT INTO `vehinfractor` VALUES (1,'ab1234','Toyota','Rav','default',2023,'rojo','circulando'),(2,'ab2345','Toyota','Rav2','default2',2023,'azul','siniestrado');
/*!40000 ALTER TABLE `vehinfractor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vmunicipal`
--

DROP TABLE IF EXISTS `vmunicipal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vmunicipal` (
  `IdVehiculoMunicipal` int NOT NULL,
  `Placa` varchar(6) DEFAULT NULL,
  `Marca` varchar(20) DEFAULT NULL,
  `Modelo` varchar(20) DEFAULT NULL,
  `NMotor` varchar(17) DEFAULT NULL,
  `Año` int DEFAULT NULL,
  `Color` varchar(20) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `Id_Personal` int NOT NULL,
  PRIMARY KEY (`IdVehiculoMunicipal`),
  KEY `FK__VMunicipa__Id_Pe__571DF1D5` (`Id_Personal`),
  CONSTRAINT `FK__VMunicipa__Id_Pe__571DF1D5` FOREIGN KEY (`Id_Personal`) REFERENCES `personal` (`Id_Personal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vmunicipal`
--

LOCK TABLES `vmunicipal` WRITE;
/*!40000 ALTER TABLE `vmunicipal` DISABLE KEYS */;
INSERT INTO `vmunicipal` VALUES (1,'gr1234','Ford','Ranger','13131313131313',2022,'Blanco','Activo',2),(5,'gr1234','Toyota','probox','121212121212',2012,'Blanco','Activo',2),(13,'gr1232','Ford','adas','141414141414',2005,'Blanco','Activo',3);
/*!40000 ALTER TABLE `vmunicipal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdmultas2'
--

--
-- Dumping routines for database 'bdmultas2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19 16:11:57
