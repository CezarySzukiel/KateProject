export const reformatAnswer = (value) => {
    let data = value.replace(/\$/g, '');
    if (data.length < 1) {
        return ''
    }
    return data;
}