export const test_info = {
    test_id: 1, // unique ID
    supported_languages: ["kor", "eng", "chn", "jpn"],
    total_number_of_questions: 11
}

export const algorithm = (result) => {
    // 1st - Over 7
    let filteredKeys = Object.keys(result).filter(key => result[key] >= 7);
    if (filteredKeys.length > 0) { return filteredKeys }
    
    // 2nd - Over 3
    let nextCandidates = Object.keys(result).filter(key => result[key] > 3);
    let maxValue = Math.max(...nextCandidates.map(key => result[key]));
    
    let keysWithMaxValue = nextCandidates.filter(key => result[key] === maxValue);
    
    return keysWithMaxValue;
};