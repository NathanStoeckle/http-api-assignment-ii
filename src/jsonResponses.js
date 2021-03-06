const users = {};

// This is a function that's set to respond with a json object
//  while taking in a request, response, status code and object
//    needed to send
const respondJSON = (request, response, status, object) => {
  
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// Function to respond without a json body
// takes request, response and status code
//    Somewhat similar to the respondJSON function
const respondJSONMeta = (request, response, status) => {
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    message: 'Success',
    users,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, body) => {
  
  // default json message if left blank
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // checks to see if any of the parameters are missing
  if (!body.name || !body.age) {
    responseJSON.id = 'Bad Request';
    
    // return 400 error
    return respondJSON(request, response, 400, responseJSON);
  }

  // default created
  let responseCode = 201;

  // checks if it was updated
  if (users[body.name]) {
    responseJSON.id = 'Updated';
    responseJSON.message = 'Updated: (no content)';
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  console.log(responseCode);
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.id = 'Success';
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  console.log(responseJSON);
  return respondJSON(request, response, responseCode, responseJSON);
};

// function for 404 not found requests with message

const notReal = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'Resource Not Found',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notRealMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// Send the public modules
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
};
