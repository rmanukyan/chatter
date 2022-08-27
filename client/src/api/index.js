import axios from "axios";

const baseURL = "http://" + window.location.hostname + ":5000/api/v1";

const instance = axios.create({ baseURL});

export const getProfileData = () => {
    return instance.get('/profile')
}


/**
 * This is just a simple example how we create an instance and this is the only place in the projects that knows
 * about your api url.
 * 
 * And for each of the requests you can create a separate function, that knows about a METHOD and a path, 
 * can receive arguments and knows what arguments will be in the body or query of the request.
 * 
 * But how would we handle authorization part? No worries, axios has it covered, please, see src/api/interceptor.js
 */