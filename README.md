# We Love Coding

[![Greenkeeper badge](https://badges.greenkeeper.io/welovecoding/welovecoding.svg)](https://greenkeeper.io/)

Website for free programming tutorials and screencasts.

## Environment Variables

```
# To make authentication via google work, one needs valid oauth credentials
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

## Development environment

```bash
npm run dev
```

- Backend will be accessible on http://localhost:8080/
- Frontend will be accessible on http://localhost:8081/

To make Google authentication work in the local dev environment, one needs to add a domain to `/etc/hosts` that is registered for the application at Google.
For macOs/Linux do:
```bash
sudo echo '127.0.0.1 localwelovecoding.com' >> /etc/hosts
```
