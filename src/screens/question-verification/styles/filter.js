
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
    unverifiedCard: {
        height: 66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8
    },
    unverifiedCardText: {
        marginLeft: 10,
        color: '#201F1F',
        fontWeight: '600'
    },
    badge: {
        marginRight: 10,
        height: 30,
        width: 30,
        backgroundColor: '#1F3061'
    },
    scrollToTop: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    questionIdText: {
        borderRadius: 10,
        backgroundColor: '#E7E7E7',
        paddingHorizontal: 10,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
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