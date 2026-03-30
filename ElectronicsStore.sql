-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.4
-- Время создания: Мар 30 2026 г., 09:58
-- Версия сервера: 8.4.6
-- Версия PHP: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ElectronicsStore`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Products`
--

CREATE TABLE `Products` (
  `ProductID` int NOT NULL,
  `Price` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `ImagePath` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Products`
--

INSERT INTO `Products` (`ProductID`, `Price`, `Name`, `Description`, `ImagePath`) VALUES
(1, 64990, 'Смартфон Apple iPhone 14 128 ГБ', 'iPhone 14, 6.1\", A15 Bionic, двойная камера 12 Мп', 'iphone_14.jpg'),
(2, 79990, 'Ноутбук ASUS TUF Gaming F15', 'Игровой ноутбук, Intel Core i5, 8 ГБ, RTX 3050, 512 ГБ SSD', 'asus_tuf_f15.jpg'),
(3, 22990, 'Умные часы Samsung Galaxy Watch 5', 'AMOLED-экран, GPS, мониторинг здоровья, влагозащита IP68', 'samsung_galaxy_watch_5.jpg'),
(4, 24990, 'Беспроводные наушники Sony WF-1000XM4', 'Наушники с активным шумоподавлением, Bluetooth 5.2, автономность до 8 ч', 'sony_wf_1000xm4.jpg'),
(5, 119990, 'Телевизор LG OLED C2 55\"', 'OLED, 4K UHD, Smart TV, поддержка HDR10, Dolby Vision', 'lg_oled_c2_55.jpg'),
(6, 89990, 'Телевизор Samsung QLED Q80B 50\"', 'QLED, 4K UHD, Quantum HDR, Smart TV, Tizen OS', 'samsung_qled_q80b_50.jpg'),
(7, 49990, 'Игровая консоль Sony PlayStation 5', 'Консоль нового поколения, SSD 825 ГБ, поддержка 4K, эксклюзивы Sony', 'playstation_5.jpg'),
(8, 27990, 'Игровая консоль Nintendo Switch OLED', 'Портативная консоль с OLED-экраном, поддержка Joy-Con, эксклюзивы Nintendo', 'nintendo_switch_oled.jpg'),
(9, 34990, 'Экшн-камера GoPro HERO11 Black', 'Съёмка до 5.3K, водонепроницаемость, стабилизация HyperSmooth 3.0', 'gopro_hero11_black.jpg'),
(10, 27990, 'Робот-пылесос Xiaomi Mi Robot Vacuum-Mop P', 'Пылесос с влажной уборкой, лидар, управление через приложение Mi Home', 'xiaomi_mi_robot_vacuum_mop_p.jpg'),
(11, 39990, 'Кофемашина De\'Longhi Magnifica S ECAM 22.110.B', 'Автоматическая кофемашина, встроенная кофемолка, капучинатор', 'delonghi_magnifica_s.jpg'),
(12, 5599, 'Пылесос DOFFLER VCC 2020 BG', 'Пылесос DOFFLER VCC 2020 BG прекрасно справится с сухой уборкой на различных поверхностях.', 'pilesos.jpg'),
(13, 2699, 'Капучинатор LERAN MLK 900', 'Профессиональный капучинатор для приготовления густой молочной пены для капучино, латте и других напитков.', 'kapuchi.jpg'),
(14, 2199, 'Блендер LERAN HBM 063 BRAYER BR 1705', 'Cовременное погружное устройство с мощным 800-Вт двигателем и турборежимом для высокой производительности.', 'blend.jpg'),
(15, 2449, 'Вафельница KITFORT KT-1620', 'Электрическая вафельница Kitfort KT-1620 поможет испечь венские и бельгийские вафли.', 'vaf.jpg'),
(16, 1499, 'Йогуртница Galaxy LINE GL-2697', 'Электрическая йогуртница позволяет готовить вкусный натуральный кисломолочный продукт в домашних условиях.', 'iog.jpg'),
(17, 5299, 'Мясорубка LERAN MG 200 GX', 'Мясорубка LERAN MG 200 GX — надёжная помощница на кухне, которая отлично подходит для ежедневного использования.', 'rub.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'test', '123456'),
(2, 'test2', '123456');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Products`
--
ALTER TABLE `Products`
  MODIFY `ProductID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
