import { doFetch } from '../../../AppUtils/apiUtils'
import { ENDPOINT } from '../../../utils/config';

// Get chapters and subject
export const GET_CHAPTERS_AND_SUBJECTS = async () => {
    try {
        let url = ENDPOINT + '/test/fetch-faculty-pending-questions-bifurcated-counts-content'
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get question ids
export const GET_QUESTION_IDS = async ({ subjectId = '', chapterId = '' }) => {
    try {
        let url = ENDPOINT + `/test/fetch-faculty-pending-questions-list-content?subject_id=${subjectId}&chapter_id=${chapterId}`
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get L3 question ids
export const GET_L3_QUESTION_IDS = async () => {
    try {
        let url = ENDPOINT + `/test/fetch-faculty-pending-questions-list-rendering`
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get question details
export const GET_QUESTION_DETAILS = async ({ questionId = '' }) => {
    try {
        let url = ENDPOINT + `/test/fetch-faculty-pending-questions-content?question_id=${questionId}`
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get chapter list
export const GET_CHAPTER_LIST = async ({ subjectId = '' }) => {
    try {
        let url = ENDPOINT + `/test/fetch-chapters-in-subject?subject_id=${subjectId}`
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Get tag list
export const GET_TAG_LIST = async ({ chapterId = '' }) => {
    try {
        let url = ENDPOINT + `/test/fetch-tags-in-chapter?chapter_id=${chapterId}`
        return await doFetch(url, 'GET');
    } catch (e) {
        console.log(e)
    }
};

// Approve question
export const APPROVE_QUESTION = async ({ params }) => {
    try {
        let url = ENDPOINT + `/test/update-question-verification-details/`
        return await doFetch(url, 'POST', params);
    } catch (e) {
        console.log(e)
    }
};

// Upload files
export const UPLOAD_FILES = async ({ params }) => {
    try {
        let url = ENDPOINT + `/test/upload-file-to-s3/`
        return await doFetch(url, 'POST', params, true);
    } catch (e) {
        console.log(e)
    }
};

// Reject question
export const REJECT_QUESTION = async ({ params }) => {
    try {
        let url = ENDPOINT + `/test/update-question-verification-details/`
        return await doFetch(url, 'POST', params);
    } catch (e) {
        console.log(e)
    }
};