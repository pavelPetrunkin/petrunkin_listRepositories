const userValidation = inputCheck => {
    const userName = inputCheck.name ? 'User name' : 'User name incorrect';
    return {
            error: !inputCheck,
            value: userName,
        };
};

const userTimerValidation = () => {
    let name;
    name = 'User Name';
    return {
            error: false,
            value: name,
        };
};


export  {userValidation,userTimerValidation};
