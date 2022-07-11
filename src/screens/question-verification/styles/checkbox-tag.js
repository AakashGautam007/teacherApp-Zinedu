
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    iconStyle: {
        borderColor: "#000000",
        borderRadius: 0,
        borderWidth: 2
    },
    text: {
        fontSize: 16,
        color: '#262626',
    }
})

export default styles;