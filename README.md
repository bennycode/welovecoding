# We Love Coding

[![Greenkeeper badge](https://badges.greenkeeper.io/welovecoding/welovecoding.svg)](https://greenkeeper.io/)

Website for free programming tutorials and screencasts.

## Development environment

### 1. Create Postgres database

1. Install [PostgreSQL](https://www.postgresql.org/)
2. Execute in `psql`
```
CREATE USER welovecodinguser WITH PASSWORD "wlc2017";
CREATE DATABASE welovecoding;
GRANT ALL PRIVILEGES ON DATABASE "welovecoding" to welovecodinguser;
```
3. Keep Postgres running

### 2. Setup virtual host

To make Google authentication work in the local development environment, one needs to add a domain to `/etc/hosts` that is registered for the application at Google.

**macOS/Linux**

```bash
sudo echo '127.0.0.1 localwelovecoding.com' >> /etc/hosts
```
**Windows**

1. Open "C:\Windows\System32\drivers\etc\hosts"
1. Add "127.0.0.1 localwelovecoding.com"

### 3. Setup environment variables

Make sure that you have a `.env` configuration file located in `backend/.env`.  

### 4. Run npm scripts

```bash
yarn install
yarn dev
```

- Backend will be accessible at http://localhost:8080/
- Frontend will be accessible at http://localhost:8081/

### Troubleshooting

If you have problems with the database, do the following:

```bash
cd backend
yarn database:reset
yarn database:populate
```
