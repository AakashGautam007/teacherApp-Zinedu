
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    tagContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 40,
        backgroundColor: '#E8E8E8',
        padding: 6,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5
    },
    text: {
        fontSize: 12,
        color: '#6F6E6E',
    }
})

export default styles;