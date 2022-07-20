
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
        fontWeight: '600',
        fontSize: 14
    },
    badge: {
        marginRight: 10,
        minHeight: 30,
        minWidth: 30,
        backgroundColor: '#1F3061'
    },
    badgeText: {
        fontSize: 14
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
    infoContainer: {
        flexDirection: 'row',
        marginTop: 12
    }
})

export default styles;