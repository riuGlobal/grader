export const grade = async gradeData  => {
    let max = gradeData.max;
    let done = gradeData.done;

    let percentage = Math.round(done/max);
    let gradeLetter = 'a'
    // console.log(gradeData.max)
    // console.log(gradeData.params)
    // let data = {}
    // data.message = "graded"

    let data = {};
    data.percentage = percentage;
    data.gradeLetter = gradeLetter
    return data
} 