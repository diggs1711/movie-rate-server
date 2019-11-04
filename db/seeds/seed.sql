SET IDENTITY_INSERT MovieRate.dbo.Movie ON;
INSERT INTO MovieRate.dbo.Movie (MovieID, Name, Description) VALUES
(1,'Harry Potter', 'They find a stone')
INSERT INTO MovieRate.dbo.Movie (MovieID, Name, Description) VALUES
(2,'Lord of the rings', 'They find a ring')
SET IDENTITY_INSERT MovieRate.dbo.Movie OFF;

SET IDENTITY_INSERT MovieRate.dbo.Actor ON;
INSERT INTO MovieRate.dbo.Actor (ActorID, Name, Age, MovieID) VALUES
(1,'Daniel Radcliffe', 25, 1)
SET IDENTITY_INSERT MovieRate.dbo.Actor OFF;