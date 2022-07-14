import { doFetch } from '../../../AppUtils/apiUtils'
import { ENDPOINT } from '../../../utils/config';

// Get Review question count
export const GET_REVIEW_QUESTION_COUNT = async () => {
    try {
        let url = ENDPOINT + '/test/fetch-faculty-pending-questions-count-content'
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get Visibility check count
export const GET_VISIBILITY_CHECK_COUNT = async () => {
    try {
        let url = ENDPOINT + '/test/fetch-faculty-pending-questions-count-rendering'
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};