const userValidation = inputCheck => {
    const userName = inputCheck.name ? 'User name' : 'User name incorrect';
    return {
            error: !inputCheck,
            value: userName,
        };
};

export  {userValidation};
