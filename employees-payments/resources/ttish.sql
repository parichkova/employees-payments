-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.19-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5284
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table employees_payments.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gender` enum('male','female') DEFAULT NULL,
  `title` enum('Mr.','Mrs.') DEFAULT NULL,
  `first_name` varchar(255) NOT NULL DEFAULT '0',
  `last_name` varchar(255) NOT NULL DEFAULT '0',
  `age` int(11) NOT NULL DEFAULT '0',
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table employees_payments.employees: ~7 rows (approximately)
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`id`, `gender`, `title`, `first_name`, `last_name`, `age`, `date_of_birth`) VALUES
	(1, 'female', 'Mrs.', 'Tom', 'Carey', 21, '1994-06-03'),
	(2, 'male', 'Mr.', 'Tom', 'Roberts', 29, '1986-04-21'),
	(3, 'male', 'Mr.', 'Luid', 'Singh', 36, '1979-04-16'),
	(4, 'male', 'Mr.', 'Mohammed', 'John', 23, '1992-05-18'),
	(5, 'male', 'Mr.', 'Owen', 'Humphreys', 43, '1972-05-15'),
	(6, 'female', 'Mrs.', 'Holly', 'Gregory', 22, '1993-01-31'),
	(7, 'female', 'Mrs.', 'Skye', 'Lawrence', 36, '1979-06-22');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;

-- Dumping structure for table employees_payments.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) unsigned NOT NULL,
  `salary` double NOT NULL,
  `take_home` double unsigned NOT NULL,
  `income_tax` double NOT NULL,
  `national_insurance` double NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK_payments_employees` (`employee_id`),
  CONSTRAINT `FK_payments_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table employees_payments.payments: ~1 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` (`payment_id`, `employee_id`, `salary`, `take_home`, `income_tax`, `national_insurance`) VALUES
	(1, 1, 75316, 51008.98, 19529.4, 4777.62),
	(2, 2, 59783, 41999.84, 13316.2, 4466.96),
	(3, 3, 50739, 36754.32, 9698.6, 4286.08),
	(4, 5, 31336, 24395.68, 4147.2, 2793.12),
	(5, 6, 60176, 42227.78, 13473.4, 4474.82),
	(6, 7, 42552, 32005.86, 6423.8, 4122.34),
	(7, 4, 26389, 21032, 3157.8, 2199.48);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
