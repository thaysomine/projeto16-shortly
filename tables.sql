CREATE DATABASE "shortlyDataBase";

CREATE TABLE users (
    id serial NOT NULL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE urls (
    id serial NOT NULL PRIMARY KEY,
    url text NOT NULL UNIQUE,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE links (
    id serial NOT NULL PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    "urlId" integer REFERENCES urls(id),
    "shortUrl" text NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id serial NOT NULL PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    token text NOT NULL UNIQUE,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);