create table [dbo].[Movie] (
    [MovieID] [int] IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Name] [varchar] (250) NULL,
    [Description] [varchar] (250) NULL
)

create table [dbo].[Actor] (
    [ActorID] [int] IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    [Name] [varchar] (250) NULL,
    [Age] [int] NOT NULL,
    [MovieID] [int] FOREIGN KEY REFERENCES Movie(MovieID)
)