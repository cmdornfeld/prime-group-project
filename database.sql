-- CREATE DATABASE 100_holes_for_hope


CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (30) UNIQUE NOT NULL,
  "password" VARCHAR (80) NOT NULL,
  "type" VARCHAR (20)
);

CREATE TABLE "golfer" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR (40) NOT NULL,
  "last_name" VARCHAR (40) NOT NULL,
  "bio" VARCHAR (1500),
  "purpose" VARCHAR (1000),
  "goal" INT,
  "img_url" VARCHAR (400)
);

CREATE TABLE "donation" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR (40),
  "last_name" VARCHAR (40),
  "phone_number" BIGINT,
  "email" VARCHAR (120) NOT NULL,
  "type" VARCHAR (20),
  "amount" INT,
  "max" INT,
  "golfer_id" INT REFERENCES "golfer"
);
 
CREATE TABLE "event" (
  "id" SERIAL PRIMARY KEY,
  "date" DATE,
  "location" VARCHAR (100)
);
 
CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR (400),
  "description" VARCHAR (200)
);
 
CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "street" VARCHAR (200) NOT NULL,
  "city" VARCHAR (50) NOT NULL,
  "state" VARCHAR (3) NOT NULL,
  "zip" INT,
  "phone" BIGINT,
  "fax" BIGINT
);

CREATE TABLE "videos" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(50),
  "url" VARCHAR (400)
);

CREATE TABLE "sponsor_level" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR (80),
  "amount" INT
);

CREATE TABLE "sponsor" (
  "id" SERIAL PRIMARY KEY,
  "img_url" VARCHAR (400),
  "level" INT REFERENCES "sponsor_level"
);

CREATE TABLE "contact" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (200) NOT NULL,
  "email" VARCHAR (100) NOT NULL
);

CREATE TABLE "mission" (
  "id" SERIAL PRIMARY KEY,
  "about" VARCHAR (1000)
);

CREATE TABLE "foundation" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (80),
  "bio" VARCHAR (500),
  "url" VARCHAR (400)
);

-- populating "address" table with information from Wix site
INSERT INTO "address" ("street", "city", "state", "zip", "phone", "fax") VALUES ('12800 Bunker Prairie Rd.', 'Coon Rapids', 'MN', '55448',
 '7637540820', '7637546682');

-- populating "contact" table with information from Wix site
INSERT INTO "contact" ("name", "email") VALUES ('Maggie Sutton', 'msutton@pgahq.com');

-- populating "event" table with information from Wix site
INSERT INTO "event" ("date", "location") VALUES ('2020-02-12', 'Mount Frontenac Golf Course');

-- populating "foundation" table with information from Wix site
INSERT INTO "foundation" ("name", "bio", "url") VALUES ('PGA REACH Minnesota', 'PGA REACH Minnesota is the 501(c)(3) charitable foundation
 of the Minnesota PGA Section. The mission of PGA REACH Minnesota is to enable access to the game of golf utilizing PGA Professionals to 
 positively impact the lives of youth, military, and diverse populations with an emphasis on inclusion.', 
 'https://www.minnesotapga.com/wp-content/uploads/2018/05/REACH_Minnesota_H_4C_BevelEmboss.png'), ('PGA HOPE', 'PGA HOPE (Helping Our Patriots
  Everywhere) is the flagship military program of PGA REACH, the charitable foundation of the PGA of America. PGA HOPE introduces golf to 
  Veterans with disabilities to enhance their physical, mental, social and emotional well-being.', 
  'https://getvectorlogo.com/wp-content/uploads/2019/03/pga-hope-helping-our-patriots-everywhere-vector-logo-xs.png');

-- populating "foundation" table with information from Wix site
INSERT INTO "mission" ("about") VALUES ('100 Holes for HOPE''s mission is to involve PGA Professionals, veterans and all golf enthusiasts 
in a marathon round of 100 holes on one of the longest day of the year! All proceeds from 100 Holes of HOPE will benefit PGA REACH 
Minnesota; specifically, the PGA HOPE (Helping Our Patriots Everywhere) program.');

-- populating "sponsor_level" table with information from Wix site
INSERT INTO "sponsor_level" ("title", "amount") VALUES ('PRESENTING', '50000'), ('GENERAL', '25000'), ('COLONEL', '10000'), ('MAJOR', 
'5000'), ('SERGEANT', '2500'), ('FOXHOLE', '1000'), ('EAGLE', '250');
INSERT INTO "sponsor_level" ("title") VALUES ('IN-KIND');

-- populating "sponsor" table with information from Wix site
INSERT INTO "sponsor" ("img_url", "level") VALUES ('https://www.minnesotapga.com/wp-content/uploads/2019/04/1.-klick-300x300.jpg', 2), 
('https://www.slot-source.com/wp-content/uploads/2015/11/aristocrat-logo.png', 4), 
('https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/300px-Minnesota_Timberwolves_logo.svg.png', 5), 
('https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Minnesota_Lynx_logo.svg/300px-Minnesota_Lynx_logo.svg.png', 5);

-- populating "videos" table with information from Wix site
INSERT INTO "videos" ("url", "title") VALUES ('https://player.vimeo.com/video/230451690?title=0&byline=0', 'What Is Hope?'), 
('https://www.youtube.com/embed/wgofXd5hZaM', '2018 100 Holes for Hope');

-- populating "golfer" table with information from Wix site
INSERT INTO "golfer" ("first_name", "last_name", "bio", "purpose", "goal", "img_url") VALUES ('IAN', 'CAREY', 'I was active Army for 4 
years as a 13B in the 75th fires brigade out of Fort Sill, OK. I deployed once to Iraq in 2006 as a gunner doing convoy security. I was 
medically discharged from the Army in 2009 and started working for the Minnesota Wild Hockey team as assistant security manager. Recently 
I have taken on a position as a private investigator for a law firm in Minneapolis. For the last ten years my dad, brother and myself have
 sponsored and participated in multiple charitable military golf tournaments each year.', 'I have been golfing since I was 10 years old. 
 I’m excited to be able to help in any way I can. My brother participated last year and told me what a great experience he had and for a 
 great cause.', '1000', 'https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg'), ('DANIEL', 'CONTRERAS', 'Dan 
 Contreras, a U.S. Army veteran, and Past State Commander of the DAV California, currently serves as the CEO-Adjutant for DAV’s Department
  of California, where he’s been for over ten years. He has also served on the National Executive Committee and was elected to the board 
  of the directors for the National Service Foundation in 2009, where he still serves today.
Mr. Contreras served in the U.S. Army from 1980 to 1996 as a combat medic and army nurse. Following his military service, he worked as a 
marketing director and case manager for Geriatric Services from 1993 to 1999. From 2000 to 2008, he worked as a DAV National Service Officer
 and Area Supervisor for the western region.
In addition to his various leadership and managerial positions within the national and state levels of the organization, he was also 
appointed to chair the California Mexican-American Veterans Memorial Committee by California Governors Schwarzenegger and Brown, He is 
married to his Minnesota sweetheart Teresa.', 'As a disabled veteran, I have been able to adapt to the game of golf. Along the way, the 
sport of golf has given me the opportunity to meet other veterans and non-veterans who may benefit from the information I can share about 
veterans benefits. Additionally, I am a member on the board for the DAV California Rehab Foundation and we have sponsored the PGA Hope 
program in our State. I commend the innovative way the program introduces and nurtures a relationship with the sport of golf and the 
veteran participants.', '1000', 'https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg'), ('MARK', 'FOLEY', 'I have 
been a golf professional for over thirty years. During my time as a professional, I have had the opportunity to volunteer with the 
Minnesota PGA and numerous veteran golf programs such as Eagle''s Turf. I currently serve as the President of the Minnesota PGA and I am 
also the head golf professional at Keller Golf Course in Maplewood, Minnesota.', 'My father was a marine in World War II and when I was 
growing up, he taught me about the values of military service. I have taught many veterans suffering with PTSD and believe that golf can 
be used as a valuable tool to relieve stress, depression and anxiety. For me, it is an honor to be able to raise money for 100 Holes for 
HOPE. By participating and raising pledges, I hope to bring more recognition to the veterans that have done so much for our country.', 
'1000', 'https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg');

-- populating "photos" table with information to test
INSERT INTO "photos" ("url", "description") VALUES ('https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg', 'test 
image'), ('https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg', 'test image2'), 
('https://image.shutterstock.com/image-vector/test-icon-260nw-577403899.jpg', 'test image3');

-- populating "donation" table with information to test
INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "max", "golfer_id") VALUES ('Jon', 'Smith', 
'6515555555', 'test@test.com', 'flat', '50', null, 1), ('Jane', 'Doe', '6515555556', 'test2@test.com', 'per birdie', '5', '100', 2), 
('Bill', 'Thomas', '6515555557', 'test3@test.com', 'flat', '25', null, 3);


-- GET h4h address, phone and fax
SELECT * FROM "address";

-- GET h4h contact name and email
SELECT * FROM "contact";

-- GET all donation information
SELECT * FROM "donation";

-- GET h4h event information
SELECT * FROM "event";

-- GET all foundation information
SELECT * FROM "foundation";

-- GET all golfer information
SELECT * FROM "golfer";

-- GET h4h mission statement
SELECT * FROM "mission";

-- GET all photos
SELECT * FROM "photos";

-- GET all sponsors and their level
SELECT "sponsor"."id", "img_url", "sponsor_level"."title", "sponsor_level"."amount"
FROM "sponsor"
JOIN "sponsor_level" ON "sponsor_level"."id" = "sponsor"."level";

-- GET all videos
SELECT * FROM "videos";