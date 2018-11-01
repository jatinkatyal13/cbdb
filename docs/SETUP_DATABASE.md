# Database Setup

## Postgres

### Create User

```sql
CREATE USER cbdbuser WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'cbdbpass';
```


### Create Database

```sql
CREATE DATABASE cbdb
    WITH 
    OWNER = cbdbuser
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE cbdb TO cbdbuser;
```