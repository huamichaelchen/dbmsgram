drop database if exists dbmsproject_hua_chen;
create database dbmsproject_hua_chen;
\c dbmsproject_hua_chen;

create table registered_user(
    username varchar(50) not null primary key,
    password varchar(256) not null,
    gender varchar(10),
    bio varchar(256),
    dob timestamp not null,
    phone varchar(20),
    given_name varchar(50),
    family_name varchar(50),
    disabled boolean,
    reason_disabled varchar(256),
    when_disabled timestamp,
    moderator_id integer
);

create table moderator(
    moderator_id integer not null primary key,
    reason_promoted varchar(256) not null,
    when_promoted timestamp not null,
    username varchar(50) not null references registered_user(username)
);

create table photo(
    photo_url varchar(512) not null primary key,
    photo_id integer not null UNIQUE,
    soft_delete_tag boolean,
    moderator_id integer not null references moderator(moderator_id),
    username varchar(50) not null references registered_user(username)
);

create table comments(
    comment_id integer not null primary key,
    content varchar(256) not null,
    photo_url varchar(512) not null references photo(photo_url)
);

create table user_liked_photo(
    username varchar(50) not null references registered_user(username),
    photo_url varchar(512) not null references photo(photo_url),
    whenLiked timestamp not null,
    primary key (username, photo_url)
);

create table user_reported_photo(
    username varchar(50) not null references registered_user(username),
    photo_url varchar(512) not null references photo(photo_url),
    when_reported timestamp not null,
    stolen boolean not null,
    spam boolean not null,
    violation boolean not null,
    primary key (username, photo_url)
);

create table follow(
    follower_username varchar(50) not null references registered_user(username),
    following_username varchar(50) not null references registered_user(username),
    primary key (follower_username, following_username)
);

create table email(
    email varchar(128) not null,
    username varchar(50) not null,
    primary key (email, username)
);

create table hashtag(
    hashtag varchar(128) not null,
    photo_url varchar(512) not null,
    primary key (hashtag, photo_url)
);

create table possess(
    username varchar(50) not null references registered_user(username),
    photo_url varchar(512) not null references photo(photo_url),
    comment_id integer not null references comments(comment_id),
    when_commented timestamp not null,
    when_photoed timestamp not null,
    primary key (username, photo_url, comment_id)
);


\copy registered_user from 'registered_user.txt' with NULL as 'null' csv;
\copy moderator from 'moderator.txt' with NULL as 'null' csv;
\copy photo from 'photo.txt' with NULL as 'null' csv;
\copy comments from 'comments.txt' with NULL as 'null' csv;
\copy user_liked_photo from 'user_liked_photo.txt' with NULL as 'null' csv;
\copy user_reported_photo from 'user_reported_photo.txt' with NULL as 'null' csv;
\copy follow from 'follow.txt' with NULL as 'null' csv;
\copy email from 'email.txt' with NULL as 'null' csv;
\copy hashtag from 'hashtag.txt' with NULL as 'null' csv;
\copy possess from 'possess.txt' with NULL as 'null' csv;

alter table registered_user add CONSTRAINT become_moderator foreign key (moderator_id) references moderator(moderator_id);
