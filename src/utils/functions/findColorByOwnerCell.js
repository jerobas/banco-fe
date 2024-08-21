const findColorByOwnerCell = (mat, value) => {
    for(let i = 0; i < mat.length; i++){
        if(mat[i].includes(value)){
            return i
        }
    }
    return null
}

export default findColorByOwnerCell;