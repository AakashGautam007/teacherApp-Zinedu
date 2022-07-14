import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width } from '../../../utils/config'

const styles = StyleSheet.create({
    difficultyLevelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 8, 
        paddingVertical: 4,
        marginBottom: 10
    },
    selected: {
        // height: 30,
        // width: 30,
        backgroundColor: '#1B3687'
    },
    text: {
        fontSize: 14,
        color: '#929292',
        marginTop: -2
    },
    selectedText: {
        color: 'white',
        fontSize: 14,
        marginTop: -2
    }
})


export default styles;