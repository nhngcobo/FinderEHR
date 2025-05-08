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
    ScrollView,
    Keyboard
} from 'react-native';
import SignUpComponent from './SignUpComponent';

export default function LoginComponent({ visible, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSignUpModal, setShowSignUpModal] = useState(false);

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

    const onRegister = () => {
        setShowSignUpModal(true);
    };

    return (
        <>
            {/* Login Modal */}
            <Modal transparent visible={visible && !showSignUpModal} animationType="fade" onRequestClose={onClose}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        onClose(); // closes modal when pressing outside
                    }}
                >
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={() => {}}>
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
                                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={[styles.input, passwordError ? styles.inputError : null]}
                                        onChangeText={handlePasswordChange}
                                        value={password}
                                        secureTextEntry
                                    />
                                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                                </View>

                                <View style={styles.horizontalLine} />

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        const emailValid = validateEmail(username);
                                        const passwordValid = validatePassword(password);

                                        if (!emailValid) setEmailError('Please enter a valid email');
                                        if (!passwordValid) setPasswordError('Password must be strong');

                                        if (emailValid && passwordValid) {
                                            onClose();
                                        }
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
                                    <TouchableOpacity onPress={onRegister}>
                                        <Text style={{ color: '#007BFF' }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* SignUp Modal */}
            {showSignUpModal && (
                <SignUpComponent
                    visible={showSignUpModal}
                    onClose={() => setShowSignUpModal(false)}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 12,
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#007BFF',
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
    },
    forgotPassButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'lightgrey',
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
    },
    closeText: {
        color: '#fff',
        fontWeight: '500',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        marginBottom: 4,
        fontWeight: '500',
        fontSize: 14,
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 4,
        borderColor: '#ccc',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginVertical: 16,
    },
});
