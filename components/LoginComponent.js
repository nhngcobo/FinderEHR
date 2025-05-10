import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';

export default function LoginComponent({ visible, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [unauthorizedError, setUnauthorizedError] = useState('');
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const [signUpData, setSignUpData] = useState({
        firstName: '',
        maidenName: '',
        surname: '',
        idNumber: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [signUpErrors, setSignUpErrors] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

    const handleEmailChange = (text) => {
        setUsername(text);
        setEmailError(validateEmail(text) ? '' : 'Invalid email format');
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError(validatePassword(text) ? '' : 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.');
    };

    const handleSignUpChange = (field, value) => {
        setSignUpData(prev => ({ ...prev, [field]: value }));

        if (field === 'email' || field === 'confirmEmail') {
            const emailValid = validateEmail(value);
            const emailsMatch = field === 'email'
                ? value === signUpData.confirmEmail
                : value === signUpData.email;

            setSignUpErrors(prev => ({
                ...prev,
                email: field === 'email' && !emailValid ? 'Invalid email format' : '',
                confirmEmail: (field === 'confirmEmail' && !emailValid)
                    ? 'Invalid email format'
                    : (!emailsMatch ? 'Emails do not match' : '')
            }));
        }

        if (field === 'password' || field === 'confirmPassword') {
            const passwordValid = validatePassword(value);
            const passwordsMatch = field === 'password'
                ? value === signUpData.confirmPassword
                : value === signUpData.password;

            setSignUpErrors(prev => ({
                ...prev,
                password: field === 'password' && !passwordValid
                    ? 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.'
                    : '',
                confirmPassword: (field === 'confirmPassword' && !passwordValid)
                    ? 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.'
                    : (!passwordsMatch ? 'Passwords do not match' : '')
            }));
        }
    };

    const handleSignUpSubmit = () => {
        const emailValid = validateEmail(signUpData.email);
        const emailsMatch = signUpData.email === signUpData.confirmEmail;
        const passwordValid = validatePassword(signUpData.password);
        const passwordsMatch = signUpData.password === signUpData.confirmPassword;

        setSignUpErrors({
            email: emailValid ? '' : 'Invalid email format',
            confirmEmail: emailsMatch ? '' : 'Emails do not match',
            password: passwordValid ? '' : 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.',
            confirmPassword: passwordsMatch ? '' : 'Passwords do not match'
        });

        if (emailValid && emailsMatch && passwordValid && passwordsMatch) {
            console.log('Sign up data:', signUpData);
            setShowSignUpModal(false);
            onClose();
        }
    };

    const login = async () => {
        try {
            const response = await fetch('https://finderehr-h0d3h4dke3ddftct.canadacentral-01.azurewebsites.net/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onClose();
            } else if (response.status === 401) {
                setUnauthorizedError("Invalid Credentials");
                setTimeout(() => setUnauthorizedError(''), 4000);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    const handleRegister = () => {
        // Simulate successful registration
        setShowSignUpModal(false);
        onClose(); // Close both modals
    };

    return (
        <>
            {/* Login Modal */}
            <Modal
                transparent
                visible={visible && !showSignUpModal}
                onRequestClose={onClose}
                animationType="fade"
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.popup}>
                                <Text style={styles.title}>Login</Text>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={[styles.input, emailError ? styles.inputError : null]}
                                        onChangeText={handleEmailChange}
                                        value={username}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={[styles.input, passwordError ? styles.inputError : null]}
                                        onChangeText={handlePasswordChange}
                                        value={password}
                                        secureTextEntry
                                    />
                                    {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                                </View>

                                <View style={styles.horizontalLine} />
                                {unauthorizedError && (
                                    <View style={styles.InvalidLoginAlert}>
                                        <Text style={styles.closeText}>{unauthorizedError}</Text>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        const emailValid = validateEmail(username);
                                        const passwordValid = validatePassword(password);
                                        if (!emailValid) setEmailError('Please enter a valid email');
                                        if (!passwordValid) setPasswordError('Password must be strong');
                                        if (emailValid && passwordValid) login();
                                    }}
                                >
                                    <Text style={styles.closeText}>Login</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.forgotPassButton}>
                                    <Text style={styles.closeText}>Forgot Your Password</Text>
                                </TouchableOpacity>

                                <View style={styles.horizontalLine} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>New to Finder EHR? </Text>
                                    <TouchableOpacity onPress={() => setShowSignUpModal(true)}>
                                        <Text style={{ color: '#007BFF' }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Sign Up Modal */}
            <Modal
                transparent
                visible={showSignUpModal}
                animationType="fade"
                onRequestClose={() => setShowSignUpModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowSignUpModal(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={[styles.popup, { maxHeight: Dimensions.get('window').height * 0.8 }]}>
                                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                                    <Text style={styles.title}>Sign Up</Text>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>First Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={signUpData.firstName}
                                            onChangeText={(text) => handleSignUpChange('firstName', text)}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Maiden Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={signUpData.maidenName}
                                            onChangeText={(text) => handleSignUpChange('maidenName', text)}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Surname</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={signUpData.surname}
                                            onChangeText={(text) => handleSignUpChange('surname', text)}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>NRIC/FIN/Passport no.</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={signUpData.idNumber}
                                            onChangeText={(text) => handleSignUpChange('idNumber', text)}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Email</Text>
                                        <TextInput
                                            style={[styles.input, signUpErrors.email ? styles.inputError : null]}
                                            value={signUpData.email}
                                            onChangeText={(text) => handleSignUpChange('email', text)}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                        {signUpErrors.email && <Text style={styles.errorText}>{signUpErrors.email}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Confirm Email</Text>
                                        <TextInput
                                            style={[styles.input, signUpErrors.confirmEmail ? styles.inputError : null]}
                                            value={signUpData.confirmEmail}
                                            onChangeText={(text) => handleSignUpChange('confirmEmail', text)}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                        {signUpErrors.confirmEmail && <Text style={styles.errorText}>{signUpErrors.confirmEmail}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput
                                            style={[styles.input, signUpErrors.password ? styles.inputError : null]}
                                            value={signUpData.password}
                                            onChangeText={(text) => handleSignUpChange('password', text)}
                                            secureTextEntry
                                        />
                                        {signUpErrors.password && <Text style={styles.errorText}>{signUpErrors.password}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Confirm Password</Text>
                                        <TextInput
                                            style={[styles.input, signUpErrors.confirmPassword ? styles.inputError : null]}
                                            value={signUpData.confirmPassword}
                                            onChangeText={(text) => handleSignUpChange('confirmPassword', text)}
                                            secureTextEntry
                                        />
                                        {signUpErrors.confirmPassword && <Text style={styles.errorText}>{signUpErrors.confirmPassword}</Text>}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={handleSignUpSubmit}
                                    >
                                        <Text style={styles.closeText}>Sign Up</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ alignSelf: 'center', marginTop: 10 }}
                                        onPress={() => setShowSignUpModal(false)}
                                    >
                                        <Text style={{ color: '#007BFF' }}>Back to Login</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#222',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 6,
    },
    input: {
        height: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
        width: "98%"
    },
    inputError: {
        borderColor: '#e53935',
    },
    errorText: {
        color: '#e53935',
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 2,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 12,
        width: '98%',
    },
    forgotPassButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
        width: '98%',
    },
    closeText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 15,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 20,
    },
    InvalidLoginAlert: {
        backgroundColor: '#fdecea',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#e53935',
        borderRadius: 4,
        marginBottom: 16,
        width: '100%',
    },
});
