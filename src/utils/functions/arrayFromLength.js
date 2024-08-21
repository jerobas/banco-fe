const arrayFromLength = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(undefined);
    }
    return arr;
};

export default arrayFromLength;