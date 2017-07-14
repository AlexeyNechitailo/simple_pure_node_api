let http = require('http');
let urlParser = require('url');

let guids = [
  '1234512345123451234512345123451',
  '2234512345123451234512345123451',
  '3234512345123451234512345123451'
];

let practices = [
  { id: 1, name: 'Node.js', description: 'Build custom Node.js projects' },
  { id: 2, name: 'Ruby', description: 'Build custom Ruby projects' }
];

let technologies = [
  { id: 1, practice_id: 1, name: 'Express.js', description: 'Express.js FE' },
  { id: 2, practice_id: 1, name: 'React.js', description: 'Node.js for BE API, React.js for FE' },
  { id: 3, practice_id: 2, name: 'Ruby', description: 'Some FE' },
  { id: 4, practice_id: 2, name: 'Rails', description: 'Some description' }
];

let practicesPath    = '/practices';
let technologiesPath = '/technologies';

let server = http.createServer( function (request, response) {
  let responseHeaders = {
    'Access-Control-Allow-Headers': 'content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const { headers, method, url } = request;

  if (method !== 'GET') {
    response.writeHead(405, responseHeaders);
    response.end();
    return
  }

  if (headers['content-type'] !== 'application/json') {
    response.writeHead(415, responseHeaders);
    response.end();
    return
  }

  if (guids.includes(headers['authorization'])) {
    const params     = urlParser.parse(url, true).query;
    const path       = urlParser.parse(url, true).pathname;
    const page       = params['page'] || 1;
    const perPage    = params['per_page'] || 2;
    const practiceId = params['practice_id'];

    switch (path) {
      case practicesPath:
        response.writeHead(200, responseHeaders);
        response.end(JSON.stringify(paginate(practices, page, perPage)));
        break;
      case technologiesPath:
        response.writeHead(200, responseHeaders);
        response.end(JSON.stringify(paginate(technologiesByPractice(practiceId), page, perPage)));
        break;
      default:
        response.writeHead(404, responseHeaders);
        response.end();
    }
  } else {
    response.writeHead(401, responseHeaders);
    response.end();
  }

  return;

  request.on('error', (err) => {
    console.error(err.stack);
  });
})

function paginate(array, pageNumber, perPage) {
  return array.slice((pageNumber - 1) * perPage, pageNumber * perPage);
}

function technologiesByPractice(practiceId) {
  if (!!practiceId) {
    return technologies.filter(function(technologie) {
      return technologie.practice_id == practiceId;
    });
  } else {
    return technologies;
  }
}

server.listen(3002);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(3002);
}
