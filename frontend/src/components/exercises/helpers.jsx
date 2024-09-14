
export const reformatAnswer = (value) => {
    let data = value.replace(/\$/g, '');
    if (data.length < 1) {
        return ''
    }
    return data;
}

export const reformatTextByDollars = (answer) => {
    /**
     * Adds $ to the beginning and end of the answer and removes every other $ from the answer.
     * @param {string, list} answer - The answer to be reformatted.
     * @return {string} The reformatted answer.
     */
    if (answer !== null && answer !== "") {
        if (typeof answer === 'object')
            answer = answer[0]
        answer = answer.replace(/\$/g, "")
        answer = `$${answer}$`
    }
    return answer
}