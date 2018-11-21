SELECT CURRENT_DATE;
DROP TABLE IF EXISTS notes;
CREATE TABLE notes( , title text not null, content text, modified timestamp default CURRENT_TIMESTAMP);


INSERT INTO notes(title, content)values('Things to do with your life', 'All sorts of things and other things'),('Baz to not do','Golf, read Shakespeare'),('Things to never do','Go back to high school'),('Things to never do','Go back to high school'),('Foo','Go back to high school'),('Bar','Go back to high school'),('Bam to never do','Go back to high school');

-- INSERT INTO notes( content)values('no title on this one');
-- DETAIL:  Failing row contains (8, null, no title on this one, 2018-11-19 13:24:34.248702).