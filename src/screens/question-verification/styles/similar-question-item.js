
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    similarQuestionButton: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        justifyContent: 'space-between',
        height: 44,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
        borderRadius: 8
    },
    percentageParentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    percentageContainer: {
        backgroundColor: '#FFF3F3',
        borderRadius: 65,
        padding: 2,
        paddingHorizontal: 8,
        marginRight: 10
    },
    percentageText: {
        color: '#D00A0A',
        fontSize: 16
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
    questionIdParentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkIcon: {
        marginLeft: 5
    },
    visitedText: {
        fontSize: 14,
        color: '#1F3061',
        marginLeft: 5
    }
})

export default styles;