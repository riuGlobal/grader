import letterGrade from 'letter-grade'

export const grade = async gradeData  => {
    let max = gradeData.max;
    let done = gradeData.done;

    let percentage = parseFloat((done*100/max).toFixed(2));
    let gradeLetter = letterGrade(percentage)

    let data = {};
    data.percentage = percentage;
    data.gradeLetter = gradeLetter

    return data
} 

