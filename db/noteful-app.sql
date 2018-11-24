-- SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders
(
    id serial PRIMARY KEY,
    name text NOT NULL
);
-- FOLDERS below lets you create any number of folders with any name. But the number of folders constrains the number of notes you can generate from sql. Why? Because your folder_id has to point to one of the folders. You can create any number of records, but only with the folder_id values in existence. In other words, you can repeat folder_id values, but you cannot
INSERT INTO folders 
    (name)
VALUES('Archive'),
    ('Drafts'),
    ('Personal'),
    ('Work'),
    ('some other thing');

-- ALTER SEQUENCE folders_id_seq RESTART with 100;


CREATE TABLE notes
(
    id serial PRIMARY KEY,
    title text not null,
    content text,
    created timestamp DEFAULT now(),
    folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

INSERT INTO notes
    (title, content, folder_id)
values('5 life lessons', 'Things about cats', 1),
    ('Things to do with your life', 'All sorts of things and other things', 2),
    ('Things to not do', 'Golf, read Shakespeare', 3),
    ('More Things to not do', 'Golf, read Shakespeare', 4),
    ('someothertitle', 'someother content', 4), ('someothertitle', 'someother content', 2), ('someothertitle', 'someother content', 3), ('title 100', 'content 100', 3);


-- ALTER SEQUENCE notes_id_seq RESTART with 1000;
-- select *
-- from notes;









SELECT *
FROM notes
    INNER JOIN folders ON notes.folder_id = folders.id;

SELECT *
FROM folders
    RIGHT JOIN notes ON folders.id = notes.folder_id;

SELECT *
FROM notes
    LEFT JOIN folders ON notes.folder_id = folders.id
WHERE notes.id = 1;

