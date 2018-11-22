SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders( id serial PRIMARY KEY, name text NOT NULL);

INSERT INTO folders(name)VALUES('Archive'),('Drafts'),('Personal'),('Work');



CREATE TABLE notes(id serial PRIMARY KEY, title text not null, content text, created timestamp DEFAULT now(), folder_id int REFERENCES folders(id) ON DELETE SET NULL);

ALTER SEQUENCE notes_id_seq RESTART with 1000;

INSERT INTO notes(title, content, folder_id)values('Things to do with your life', 'All sorts of things and other things',null),('Things to not do','Golf, read Shakespeare',1),('Things to never do','Go back to high school, do a coding bootcamp',2),('Things to never ever do no way ','Eat your feet, knit, learn Esperanto',3);

-- SELECT * FROM notes
-- INNER JOIN folders ON notes.folder_id = folders.id;

-- SELECT * FROM notes
-- LEFT JOIN folders ON notes.folder_id = folders.id;

-- SELECT * FROM notes
-- LEFT JOIN folders ON notes.folder_id = folders.id
-- WHERE notes.id = 1003;

