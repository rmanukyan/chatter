const apiBaseURL = "http://" + window.location.hostname + ":5000/api/v1/";
/**
 * It must've been painful to pass a token to each of these functions...
 * The Node.js course reviewer will not judge your frontend code strictly, anyway. You don't have to make all of the 
 * changes I am going to write about. 
 * Everything I write below is only because I'd like to share my knowledge with you.
 * 
 * It's totally ok to use native fetch api. 
 * But in most of the projects an axios package is used for this purpose
 * https://www.npmjs.com/package/axios
 * 
 *  I added some pseude code in /src/api/index.js. Please, see that file.
 * 
 */
export const GET = (url, token) => {
  return fetch(apiBaseURL + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const PUT = (url, token) => {
  return fetch(apiBaseURL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const POST = (url, data, token) => {
  return fetch(apiBaseURL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
};

export const POST_FILE = (url, data, token) => {
  return fetch(apiBaseURL + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: data,
  });
};
