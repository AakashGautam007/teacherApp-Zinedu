
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        paddingBottom: 20,
        marginVertical: 10
    },
    heading: {
        fontSize: 16
    },
    tag: {
        marginVertical: 10
    },
    borderContainer: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 20
    },
    questionText: {
        color: '#5B5B5B',
        fontSize: 16
    },
    answerText: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 20
    },
})

export default styles;