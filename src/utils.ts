let timeoutID: number;
/**
 * delays the function call by a certain time and
 * only executes the last call in that time frame.
 * @param wait debounce time in ms.
 * @param func The function to debounce.
 * @param args Arguments of the function.
 */
function debounce(wait: number, func: Function, ...args: any) {
    const later = () => {
        clearTimeout(timeoutID);
        func(...args);
    };
    clearTimeout(timeoutID);
    timeoutID = setTimeout(later, wait);
};

function showLoading() {
    
}

export { debounce, showLoading };


// For searchWord Method
// difference = searchIndex - card.indexes[0];
// if(difference>(5*word.length)) { // removes irrelevant results.
//     card.indexes.push(0);
//     break;
// }