PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE enrollroom (user_name varchar(30) ,room_name varchar(30) );
INSERT INTO enrollroom VALUES('nehal','MAth');
INSERT INTO enrollroom VALUES('Doaa','MAth');
INSERT INTO enrollroom VALUES('yara','zeft');
INSERT INTO enrollroom VALUES('neama','zeft');
INSERT INTO enrollroom VALUES('Doaa','zeft');
CREATE TABLE room (name varchar(30) primary key,availbe boolean);
INSERT INTO room VALUES('jkghjcjh',1);
INSERT INTO room VALUES('MAth',1);
INSERT INTO room VALUES('zeft',1);
INSERT INTO room VALUES('English',1);
CREATE TABLE user (name varchar(30) primary key,password int ,type varchar(30),image varchar(100));
INSERT INTO user VALUES('nehal',123,'teacher','img/img1.jpg');
INSERT INTO user VALUES('Doaa',159,'student','img/img1.jpg');
INSERT INTO user VALUES('neama',147,'student','img/img1.jpg');
COMMIT;
nehal|123|teacher|img/img1.jpg
Doaa|159|student|img/img1.jpg
neama|147|student|img/IMG_1692.JPG
nehal|123|teacher|img/img1.jpg
Doaa|159|student|img/img1.jpg
neama|147|student|img/IMG_1692.JPG
enrollroom  room        user      
