import { StyleSheet } from 'react-native'
import { typography } from '../../../appStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 14,
        color: '#272323',
        width: '60%',
        textAlign: 'center',
        marginTop: -20,
        fontFamily: typography.montserrat_400
    },
    image: {
        height: 250,
        width: 250,
    }
})

export default styles;