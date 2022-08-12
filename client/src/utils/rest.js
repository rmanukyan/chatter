const apiBaseURL = "http://" + window.location.hostname + ":5000/api/v1/";

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
