# ReactJS Auth0 Bootstrap ViteJS

This is a client-side single page application that makes requests to a backend API.

---

## Requirements

- NVM or NodeJS `v16.14.0`
- Yarn `v1.22.17`
- API [https://github.com/codingwithmanny/nodets-prisma-auth0-bootstrap](https://github.com/codingwithmanny/nodets-prisma-auth0-bootstrap)

---

## Pre Configuration

### Create Environment File

```bash
cp env.example .env;
```

### Auth0 Single Page Application

A. Go to `https://manage.auth0.com/dashboard/us/YOUR_TENANT_NAME/applications`

B. Click on **Create Application**

C. Give your application a `Name`, select `Single Page Web Applications`, and click **Create**

D. Once in your new app, click on the **Settings** tab

E. In the Settings section, copy the `Domain` and `Client ID` and place them in your `.env` file as:

```
VITE_API_URL="http://localhost:5001/api"
VITE_AUTH0_DOMAIN="DOMAIN_HERE"
VITE_AUTH0_CLIENT_ID="CLIENT_ID_HERE"
VITE_AUTH0_AUDIENCE=""
```

F. Still in the Setting section, scroll down and add the following:

**Allowed Callback URLs**

```
http://localhost:3000, http://localhost:3000/account
```

**Allowed Logout URLs**

```
http://localhost:3000
```

**Allowed Web Origins**

```
http://localhost:3000
```

G. Scroll down and click **Save**

### Auth0 API

A. Go to `https://manage.auth0.com/dashboard/us/YOUR_TENANT_NAME/apis`

B. Click on **Create API**

C. Give your api a `Name`, an iden `Identifier` _(ex: https://UNIQUE_DOMAIN_NAME_IDENTIFIER.DOMAIN_EXT - https://myawesomeapi.net)_, and click **Create**

D. Once in your new api, click on the **Settings** tab

E. In the Settings section, copy the `Identifier` and place it in your `.env` file as:

```
VITE_API_URL="http://localhost:5001/api"
VITE_AUTH0_DOMAIN="DOMAIN_HERE"
VITE_AUTH0_CLIENT_ID="CLIENT_ID_HERE"
VITE_AUTH0_AUDIENCE="YOUR_IDENTIFIER_HERE"
```

---

## Local Setup

Make sure you have the correct version of node installed:

```bash
nvm install;
```

### 1 - Install Dependencies

```bash
yarn;
```

### 3 - Start Application

```bash
yarn dev;
```
