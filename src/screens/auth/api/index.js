import { doFetch } from '../../../AppUtils/apiUtils'
import { ENDPOINT } from '../../../utils/config';

// Get Review question count
export const LOGIN_API = async (params) => {
    try {
        let url = ENDPOINT + '/login/'
        return await doFetch(url, 'POST', params);
    } catch (e) {
        console.log(e)
    }
};