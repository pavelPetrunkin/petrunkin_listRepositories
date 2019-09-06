
const checkEmptyFields = name => name.replace(/^\s*/, '').replace(/\s*$/, '');

function validateUser(name) {
    return name !== '';
}

const inputCheck = function(value) {
    return typeof value !== "number" ? value.replace(/^\s*/, '').replace(/\s*$/, '').trim() : value;
};

export {
    inputCheck,
    checkEmptyFields,
    validateUser,
};
