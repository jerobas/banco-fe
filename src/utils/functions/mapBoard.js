const reduceTo1 = (initial, value, newInitial) => {
    return newInitial + ((value - initial) / 2)
}

const mapBoard = (i, length) => {
    if (i <= length / 4) {
        return i
    }

    else if (i < 3 * length / 4 - 1) {
        if (i % 2 == (length / 4 + 1) % 2) {
            return reduceTo1(i, (length / 4) + 1, length - 1)
        }
        else {
            return reduceTo1((length / 4) + 2, i, (length / 4) + 1)
        }
    }

    else {
        return (length / 2) + (length - 1 - i)
    }
}

export default mapBoard;