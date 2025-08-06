const handleFirebaseAuthError = (error) => {
    const errorCode = error.code;
    let errorMessage;

    switch (errorCode) {
        case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please sign in instead.';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
        case 'auth/user-not-found':
            errorMessage = 'No account found with this email. Please sign up.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Too many unsuccessful attempts. Please try again later.';
            break;
        case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters.';
            break;
        default:
            errorMessage = 'Wrong Password. Please try again.';
    }

    return errorMessage;
};

export default handleFirebaseAuthError;