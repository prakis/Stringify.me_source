const CRLF = '\r\n';
const LF = '\n';
const TAB = '\t';
const SPACE = " ";
const DASH = "-";
const DOT = ".";
const UNDER_SCORE = "_";

function isEmpty(obj) {
    if(obj !== null ){
        return Object.keys(obj).length === 0;
    }
    return true;
}

function replaceAll(str, find, replace) {
    if(find === DOT){  //dot can't be used normally in regex
        return str.split(find).join(replace);
    }
    return str.replace(new RegExp(find, 'g'), replace); // this is faster
}

function trim(s){ 
    return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}    

function arrayToUpper(arr){
    return arr.map(function(x){  return x.toUpperCase()   });
}

function escapedJSONString(str){
    return str.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
}
export default { LF, TAB, CRLF, SPACE, DASH, DOT, UNDER_SCORE, isEmpty, replaceAll, trim, arrayToUpper, escapedJSONString};
/*module.exports = {
    isEmpty:isEmpty,
    replaceAll: replaceAll,    
    trim: trim,
    arrayToUpper: arrayToUpper    
};*/
