
export const generateSubjectList = (chapterDetails = []) => {
    let overallTotal = 0;
    const subjectMap = {};
    for (const chapterData of chapterDetails) {
        const chapterEntry = {
            id: chapterData.chapter_assoc_id,
            name: chapterData.chapter_name,
            total: chapterData.total,
        };

        if (chapterData.subject_assoc_id in subjectMap) {
            subjectMap[chapterData.subject_assoc_id].chapters.push(chapterEntry);
            subjectMap[chapterData.subject_assoc_id].total += chapterData.total;
        } else {
            subjectMap[chapterData.subject_assoc_id] = {
                id: chapterData.subject_assoc_id,
                name: chapterData.subject_name,
                total: chapterData.total || 0,
                chapters: [chapterEntry],
            };
        }
        overallTotal += chapterData.total;
    }
    return [overallTotal, Object.values(subjectMap)];
};

export const FEATURE_TYPE = new Map([
    ['1', 'Conceptual'],
    ['2', 'Analytical'],
    ['3', 'Memory']
])

export const QUESTION_TYPE = new Map([
    ['1', 'Objective'],
    ['2', 'Multiple choice'],
    ['3', 'Fill in the blank']
])
// const QUESTION_TYPE = ['Objective', 'Multiple choice', 'Fill in the blank']

export const getKeyByValueFromMap = ({ map, searchValue }) => {
    for (let [key, value] of map?.entries()) {
        if (value === searchValue)
            return key;
    }
}

export const getCurrentLevel = ({ L1 = [], L2 = [], L3 = [], questionId = '' }) => {
    if (L1.indexOf(questionId) != -1) {
        return '1'
    }
    if (L2.indexOf(questionId) != -1) {
        return '2'
    }
    if (L3.indexOf(questionId) != -1) {
        return '3'
    }
    return '1'
}

export const getOptionName = (index) => {
    switch (index) {
        case 0: return 'Option A'
        case 1: return 'Option B'
        case 2: return 'Option C'
        case 3: return 'Option D'
        default: break;
    }
}