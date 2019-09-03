
const checkEmptyFields = function(values) {
    const checkedFields = [];
    const nameFields = [];
    for(let key in values) {
        checkedFields.push(values[key].replace(/^\s*/, '').replace(/\s*$/, ''));
        nameFields.push(key);
    }
    const checkedObjects = {};
    nameFields.forEach((item,i) => checkedObjects[item]=checkedFields[i]);
    return checkedObjects;
};

function validateUser(data) {
    return data.userName !== '';
}

const inputCheck = function(value) {
    return typeof value !== "number" ? value.replace(/^\s*/, '').replace(/\s*$/, '').trim() : value;
};

export {
    inputCheck,
    checkEmptyFields,
    validateUser,
};
