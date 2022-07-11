
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 40,
        backgroundColor: '#F1F1F1',
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