import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import { Badge } from '../../dashboard/components/Badge'
import styles from '../styles/accordian'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SubAccordianList from './SubAccordianList'

const Accordian = ({ item }) => {
    const { id, name, total, chapters } = item
    const [showList, setShowList] = useState(false);
    return <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.header} onPress={() => setShowList(!showList)}>
            <Text style={styles.headerText}>{name}</Text>
            <View style={styles.badgeContainer}>
                <Badge
                    count={total}
                    viewStyle={styles.badge}
                    textStyle={styles.badgeText}
                />
                <Fontisto
                    name={!showList ? 'angle-down' : 'angle-up'}
                    size={15} />
            </View>
        </TouchableOpacity>

        {showList && <FlatList
            keyExtractor={(item, index) => item?._id}
            data={chapters}
            renderItem={({ item, index }) => {
                return <SubAccordianList
                    item={item}
                    subjectId={id}
                />
            }}
        />}

        {/* {showList && <TouchableOpacity style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Laws of motion</Text>
            <View style={styles.subHeaderBadgeContainer}>
                <Badge
                    count={'6'}
                    viewStyle={[styles.badge, { backgroundColor: '#F2F6FF' }]}
                    textStyle={styles.subHeaderBadgeText}
                />
                <Fontisto name='angle-right' size={15} />
            </View>
        </TouchableOpacity>} */}

    </View>
}

export default Accordian;