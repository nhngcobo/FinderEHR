import React, { useState, useRef, useEffect } from 'react';
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
    Animated
} from 'react-native';
import SignUpComponent from './SignUpComponent';

export default function LoginComponent({ visible, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [unauthorizedError, setUnauthorizedError] = useState('');
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const shakeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (visible) {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.8);
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        friction: 6,
                        tension: 80,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 50);
        }
    }, [visible]);
    

    useEffect(() => {
        if (unauthorizedError) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();

            const timeout = setTimeout(() => {
                setUnauthorizedError('');
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [unauthorizedError]);

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
        onClose(); 
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
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    return (
        <>
            <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); onClose(); }}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[
                                    styles.popup,
                                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                                ]}
                            >
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
                                    <Animated.View style={[styles.InvalidLoginAlert, { transform: [{ translateX: shakeAnim }] }]}>
                                        <Text style={styles.closeText}>{unauthorizedError}</Text>
                                    </Animated.View>
                                )}

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        const emailValid = validateEmail(username);
                                        const passwordValid = validatePassword(password);

                                        if (!emailValid) setEmailError('Please enter a valid email');
                                        if (!passwordValid) setPasswordError('Password must be strong');

                                        if (emailValid && passwordValid) {
                                            login();
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
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

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
    InvalidLoginAlert: {
        paddingVertical: 8,
        paddingHorizontal: 95,
        backgroundColor: 'lightgrey',
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        borderLeftWidth: 3,
        borderColor: "red",
        marginBottom: 16,
    },
    closeText: {
        color: '#4a3d48',
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
