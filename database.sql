-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
	CONSTRAINT "user_id" PRIMARY KEY ("id")
);


CREATE TABLE "task" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"task_details" TEXT NOT NULL,
	"is_complete" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "task_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Calendar" (
	"id" serial NOT NULL,
	"household_id" integer NOT NULL UNIQUE,
	"event_details" TEXT NOT NULL,
	"start_time" DATETIME NOT NULL,
	"end_time" DATETIME,
	"color" VARCHAR(255) NOT NULL,
	CONSTRAINT "Calendar_pk" PRIMARY KEY ("id")
);


CREATE TABLE "goals" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"type" varchar(200) NOT NULL,
	"description" varchar NOT NULL,
	"is_complete" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "goals_pk" PRIMARY KEY ("id")
);



CREATE TABLE "household" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "household_pk" PRIMARY KEY ("id")
);



CREATE TABLE "household_members" (
	"household_id" integer NOT NULL UNIQUE,
	"user_id" integer NOT NULL UNIQUE,
	"household_member_status" VARCHAR(255) NOT NULL
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"household_id" integer NOT NULL,
	"survey_date" DATE NOT NULL,
	"survey_type" VARCHAR(255) NOT NULL,
	"answer_1" integer NOT NULL,
	"answer_2" integer NOT NULL,
	"answer_3" integer NOT NULL,
	"answer_4" integer NOT NULL,
	"answer_5" integer NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
);

