import axios from './index';

/**
 * This is the only code that knows about the place where to attach a token while making a request
 * For more details https://www.npmjs.com/package/axios#interceptors
 * https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
 */
const bearer = "Bearer " + session.token;

axios.interceptors.request.use(
    config => {
        const token = bearer;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

    /**
     * And yes, everything that axios has can be handled with native fetch API + extra code, 
     * but if you do that, you'll have good chances to create your own 'axios'
     */
 
 