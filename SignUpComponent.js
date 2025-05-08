import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

export default function SignUpComponent({ visible, onClose }) {
    const [username, setUsername] = React.useState('');
    const [maidenname, setMaidenName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [idNumber, setIdNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmEmail, setConfirmEmail] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [emailError, setEmailError] = React.useState('');
    const [confirmEmailError, setConfirmEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailError(validateEmail(text) ? '' : 'Invalid email format');
    };

    const handleConfirmEmailChange = (text) => {
        setConfirmEmail(text);
        setConfirmEmailError(validateEmail(text) ? '' : 'Invalid email format');
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError(validatePassword(text) ? '' : 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.');
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        setConfirmPasswordError(validatePassword(text) ? '' : 'Password must be 8+ characters, incl. uppercase, lowercase, number, and special char.');
    };

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); onClose(); }}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.popup}>
                            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                                <Text style={styles.title}>Sign Up</Text>

                                {/* First Name */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>First Name</Text>
                                    <TextInput style={styles.input} value={username} onChangeText={setUsername} />
                                </View>

                                {/* Maiden Name */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Maiden Name</Text>
                                    <TextInput style={styles.input} value={maidenname} onChangeText={setMaidenName} />
                                </View>

                                {/* Surname */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Surname</Text>
                                    <TextInput style={styles.input} value={surname} onChangeText={setSurname} />
                                </View>

                                {/* ID Number */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>NRIC/FIN/Passport no. of doctor</Text>
                                    <TextInput style={styles.input} value={idNumber} onChangeText={setIdNumber} />
                                </View>

                                {/* Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={[styles.input, emailError ? styles.inputError : null]}
                                        value={email}
                                        onChangeText={handleEmailChange}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                                </View>

                                {/* Confirm Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Email</Text>
                                    <TextInput
                                        style={[styles.input, confirmEmailError ? styles.inputError : null]}
                                        value={confirmEmail}
                                        onChangeText={handleConfirmEmailChange}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {confirmEmailError ? <Text style={styles.errorText}>{confirmEmailError}</Text> : null}
                                </View>

                                {/* Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={[styles.input, passwordError ? styles.inputError : null]}
                                        value={password}
                                        onChangeText={handlePasswordChange}
                                        secureTextEntry
                                    />
                                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                                </View>

                                {/* Confirm Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <TextInput
                                        style={[styles.input, confirmPasswordError ? styles.inputError : null]}
                                        value={confirmPassword}
                                        onChangeText={handleConfirmPasswordChange}
                                        secureTextEntry
                                    />
                                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                                </View>
                            </ScrollView>

                            <View style={styles.horizontalLine} />

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    const emailValid = validateEmail(email);
                                    const passwordValid = validatePassword(password);
                                    if (!emailValid) setEmailError('Please enter a valid email');
                                    if (!passwordValid) setPasswordError('Password must be strong');
                                    if (emailValid && passwordValid) onClose();
                                }}
                            >
                                <Text style={styles.closeText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
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
        maxHeight: '80%',
    },
    title: {
        fontSize: 20,
        marginBottom: 12,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    closeButton: {
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        alignSelf: 'center',
    },
    closeText: {
        color: '#fff',
        fontWeight: '600',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
});
