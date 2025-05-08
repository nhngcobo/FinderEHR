import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';

export default function LoginComponent({ visible, onClose }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (text) => {
        setUsername(text);
        if (!validateEmail(text)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return strongRegex.test(password);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (!validatePassword(text)) {
            setPasswordError('Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.title}>Login</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 33 }}>Email</Text>
                        <TextInput
                            style={[styles.input, emailError ? styles.inputError : null]}
                            onChangeText={handleEmailChange}
                            value={username}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 10 }}>Password</Text>
                        <TextInput
                            style={[styles.input, passwordError ? styles.inputError : null]}
                            onChangeText={handlePasswordChange}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>

                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

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

                    <TouchableOpacity style={styles.forgotPassButton} onPress={onClose}>
                        <Text style={styles.closeText}>Forgot Your Password</Text>
                    </TouchableOpacity>

                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: "row" }}>
                        <Text>New to Finder EHR? </Text>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={{ color: "#007BFF" }}>Register</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
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
    input: {
        height: 35,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        width: 150,
        borderRadius: 4,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 100,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginVertical: 16,
    },
});
