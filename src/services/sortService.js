export function moveToNextInArray(array, index){
    let finalArray = [];
    for(let i = 0; i < index; i++){
        finalArray.push(array[i])
    }
    finalArray.push(array[index + 1])
    finalArray.push(array[index]);

    if(index < array.length - 1) {
        for(let i = index + 2; i < array.length; i++){
            finalArray.push(array[i]);
        }
    }
    return finalArray;
}

export function moveToPreviousInArray(array, index){
    let finalArray = [];
    if(index > 1){
        for(let i = 0; i < index - 1; i++){
            finalArray.push(array[i])
        }
    }
    finalArray.push(array[index])
    finalArray.push(array[index - 1]);
    for(let i = index + 2; i < array.length; i++){
        finalArray.push(array[i]);
    }
    return finalArray;                                                                                                                                                                //coucou :)

}