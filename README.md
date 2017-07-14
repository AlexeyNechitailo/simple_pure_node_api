# simple_pure_node_api

This API is build to return practices or technologies (hardcoded for now) to authorized users.

## Installation

Install `node` and you are ready to go. Use `node index.js` to start the server. Server runs on 3002 port by default.

## Usage

API accepts `GET` requests with `content-type = application/json`. Valid 32-digit GUID should be provided in the `authorization` header field. Practices could be retrieved using `/practices` endpoint, techologies via `/technologies` endpoint. To retrieve technologies by practice `practice_id` parameter should be provided.

```
curl -i -H "Content-type: application/json" -H "Accept: application/json" -H "Authorization: 1234512345123451234512345123451"  "http://localhost:3002/technologies?{"practice_id":2}"
```

For paginated results `page` (defaults to 1) and `per_page` (defaults to 2) values can be provided.

```
curl -i -H "Content-type: application/json" -H "Accept: application/json" -H "Authorization:4512345123451"  "http://localhost:3002/technologies?practice_id=2&page=1&per_page=1"
```
