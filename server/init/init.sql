CREATE TABLE IF NOT EXISTS `koa_test` (
    `id` int(12) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) unique DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    `nick` varchar(255) DEFAULT NULL,
    `detail_info` json DEFAULT NULL,
    `create_time` varchar(20) DEFAULT NULL,
    `modified_time` varchar(20) DEFAULT NULL,
    `level` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `koa_test` set email='103941@example.com', name='laowai', nick='wai', password='Aa123456';
INSERT INTO `koa_test` set email='745666@example.com', name='laoxiang', nick='xiang', password='Aa123456';
INSERT INTO `koa_test` set email='834220@example.com', name='laoding', nick='ding', password='Aa123456';

CREATE TABLE IF NOT EXISTS `koa_test_goods` (
    `id` int(36) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) unique DEFAULT NULL,
    `price` varchar(30) DEFAULT NULL,
    `detail` varchar(400) DEFAULT NULL,
    `create_time` varchar(20) DEFAULT NULL,
    `modified_time` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

-- DROP TABLE koa_test;
-- truncate koa_test;