
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    parentContainer: {
        // flex: 1,
        backgroundColor: '#E5E5E5',
        // paddingHorizontal: 20,
        // paddingBottom: 40,
        // marginTop: 20
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
        fontSize: 16,
        marginTop: 10
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
    },
    approveRejectContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10
    },
    approveButton: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2B3789',
        paddingHorizontal: 20,
        padding: 6,
        alignSelf: 'flex-start'
    },
    approveText: {
        color: '#2B3789',
        fontSize: 14
    },
    modalParentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        margin: 30,
        borderRadius: 8
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center'
    },
    questionPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F5F8FF',
        borderRadius: 45,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    editText: {
        color: '#1B3687',
        fontSize: 14
    },
    editIcon: {
        marginLeft: 5
    },
    subHeadingContainer: {
        marginTop: 20
    },
    subHeading: {
        fontSize: 14,
        marginBottom: 10
    },
    subHeadingGray: {
        fontSize: 16,
        color: '#929292'
    },
    editModalParentContainer: {
        flex: 1,
        // alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.2)',
        // alignSelf: 'flex-end'
    },
    editModalContainer: {
        backgroundColor: 'white',
        // paddingVertical: 20,
        // paddingHorizontal: 20,
        // margin: 30,
        flex: 0.8,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    flatlistContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    selectedTagContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingBottom: 5
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#858585',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 5
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        marginLeft: 5
    },
    rejectModalContainer: {
        backgroundColor: 'white',
        // paddingVertical: 20,
        // paddingHorizontal: 20,
        // margin: 30,
        flex: 0.38,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    rejectReasonContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#858585',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 5
    },
    rejectTextInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5
    },
    screenshotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#969696',
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        borderRadius: 2,
        width: '100%'
    },
    screenshotText: {
        color: '#606060',
        fontSize: 14
    }
})

export default styles;