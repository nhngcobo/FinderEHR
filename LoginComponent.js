import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';

export default function LoginComponent({ visible, onClose }) {
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');


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
                            style={styles.input}
                            onChangeText={onChangeUsername}
                            value={username}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 10 }}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                        />
                    </View>
                    <View style={styles.horizontalLine} />

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPassButton} onPress={onClose}>
                        <Text style={styles.closeText}>Forgot Your Password</Text>
                    </TouchableOpacity>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: "row" }}>
                        <Text >New to Finder EHR? </Text><Text style={{ color: "#007BFF" }}>Register</Text>

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
        borderRadius: 4
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginVertical: 16, // spacing above and below
    },

});
