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
  "bio" VARCHAR (1000),
  "purpose" VARCHAR (500),
  "goal" INT,
  "img_url" VARCHAR (400)
);

CREATE TABLE "donation" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR (40),
  "last_name" VARCHAR (40),
  "phone_number" INT,
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
  "state" VARCHAR (3) NOT NULL
);
 
CREATE TABLE "videos" (
  "id" SERIAL PRIMARY KEY,
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