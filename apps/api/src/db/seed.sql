INSERT INTO activity
(id, title, description, category, date, city, venue)
VALUES
(uuid_generate_v1(), 'Petting Cats', 'I pet my cats', 'Pets', DATE '2001-02-16', 'DeWitt', 'Looking Glass'),
(uuid_generate_v1(), 'Petting Dog', 'I pet my dog', 'Pets', DATE '2002-02-16', 'DeWitt', 'Looking Glass'),
;


INSERT INTO activity
(id, title, description, category, date, city, venue)
VALUES
(uuid_generate_v1(), 'Kayaking', 'I Kayak', 'Sports', DATE '2012-01-01', 'UP', 'Lake Superior'),
(uuid_generate_v1(), 'Tennis', 'Kass and I play tennis', 'Sports', DATE '2002-02-16', 'Michigan', 'DeWitt High School'),
(uuid_generate_v1(), 'Wedding', 'Kass and I got married', 'Love', DATE '2019-10-19', 'Yosemite', 'Glacier Point')
;
