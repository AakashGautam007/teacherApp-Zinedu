
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    parentContainer: {
        // flex: 1,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
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
        padding: 12,
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
    questionIdTextContainer: {
        borderRadius: 10,
        backgroundColor: '#E7E7E7',
        paddingHorizontal: 10,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionIdText: {
        color: '#595959'
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    questionBorderContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        paddingVertical: 5,
        marginTop: 20,
        borderColor: '#BDBDBD',
    }
})

export default styles;