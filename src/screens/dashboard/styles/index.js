
import React from 'react'
import { StyleSheet } from 'react-native'
import { STYLES } from '../../../appStyles';
import { width, postAnalytics } from '../../../utils/config'

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        width,
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    viewScheduleCardParentContainer: {
        backgroundColor: '#EE7929',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 98,
        borderRadius: 8,
        marginTop: 25,
        marginBottom: 20
    },
    viewScheduleCardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: 16,
    },
    viewSchedule: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 13,
        padding: 7,
        borderRadius: 47
    },
    classesText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 15
    },
    viewScheduleText: {
        color: '#1C3687',
        fontSize: 14,
        fontWeight: '500'
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
        height: 108,
        borderRadius: 8,
    },
    cardText: {
        width: 65,
        textAlign: 'center',
        fontSize: 14
    },
    cardInactiveText: {
        width: 65,
        textAlign: 'center',
        color: '#ADADAD'
    },
    questionVerificationParentContainer: {
        ...STYLES.elevation,
        marginTop: 20,
        padding: 20,
    },
    questionVerificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        marginVertical: 10,
        // backgroundColor: 'green',
        marginRight: 10
    },
    questionVerificationText: {
        fontSize: 14,
        fontWeight: '500'
    },
    questionVerificationActiveCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
        height: 84, 
        borderRadius: 8,
    },
    questionVerificationInactiveCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        // elevation: 2,
        height: 84,
        borderRadius: 8,
    },
    headerParentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    }
})

export default styles;