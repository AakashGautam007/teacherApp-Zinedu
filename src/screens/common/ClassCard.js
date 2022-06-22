import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, ImageBackground } from 'react-native'
import { width } from '../../utils/config'
import Clock from "../../assets/Clock.svg"
import LocationIcon from "../../assets/location.svg"
import TagBG from "../../assets/tagBG.svg"
import dateFormat from "dateformat";
import Miscellaneous from "../../assets/misc_icon.svg"
import png from "../../assets/bell.png"







function ClassCard({ item, isPastClassPage }) {

	return (
		<SafeAreaView>
			<View style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(221, 224, 249, 1)", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15, marginTop: 10, marginLeft: width * 0.06 }}>
				<Text>{item.mode_of_class}</Text>
			</View>


			<View style={styles.card}>
				<View style={{ position: "absolute", zIndex: 2, paddingHorizontal: 12, paddingVertical: 5, marginTop: -24, justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.9 - 90 }}
				>
					<TagBG width={90} height={50} />
					<Text style={{ color: 'white', position: 'absolute', fontSize: 14 }}>{item.class_type}</Text>
				</View>



				<View style={styles.row}>
					<View style={styles.circle}>
						<Clock width={20} height={20} />

					</View>

					<Text style={styles.text}>{dateFormat(item.start_date, "ddd dd/mm/yyyy hh:MM tt")}</Text>

				</View>

				{!isPastClassPage && item.mode_of_class !== "Offline" && <View style={styles.row}>
					<View style={styles.circle}>
						<LocationIcon width={20} height={20} />


					</View>

					<Text style={styles.text}>Studio 11</Text>

				</View>}

				<View style={{ flexDirection: "column", marginBottom: 10, marginTop: 10 }}>
					<Text style={styles.heading}>Group</Text>
					<Text style={styles.text}>{item.group_name}</Text>
				</View>

				<View style={{ flexDirection: "column", marginBottom: 10 }}>
					<Text style={styles.heading}>Subject</Text>
					<Text style={styles.text}>{item.subject_name}</Text>
				</View>

				<View style={{ flexDirection: "column", marginBottom: 20 }}>
					<Text style={styles.heading}>Chapter</Text>
					{item.chapter_name === "Miscellaneous" ? <View style={{ fontSize: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 2 }} ><Miscellaneous width={20} height={20} /><Text style={{ color: 'red', paddingLeft: 2 }}>Miscellaneous</Text></View> : <Text style={styles.text}>{item.chapter_name}</Text>}

				</View>

				{/* {item.tag_list.length > 0 && <FlatList style={{ zIndex: 1000 }}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={item.tag_list}
					renderItem={({ item, index }) => {
						return <View style={{ backgroundColor: "rgba(243, 243, 243, 1)", marginRight: 7, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 20 }}>
							<Text style={{ color: 'rgba(126, 126, 126, 1)' }}>{item.tag_name}</Text>
						</View>
					}}

				/>} */}



			</View>
		</SafeAreaView >
	)
}

export default ClassCard

const styles = StyleSheet.create({
	card: {
		zIndex: 1,
		width: width * 0.93,
		padding: 10,
		backgroundColor: 'white',
		marginBottom: 10,
		borderRadius: 8,
		alignItems: 'flex-start',
		marginTop: 20,
		paddingTop: 25,
		paddingLeft: width * 0.06,
		flexDirection: 'column',
	},
	row: {
		width: "100%",
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
		// backgroundColor: 'red'
	},
	text: {
		marginTop: 2,
		fontSize: 14, color: "black", fontWeight: "500"
	},
	heading: {
		fontSize: 15, color: "rgba(114, 114, 114, 1)", fontWeight: "500"
	},
	circle: {
		marginRight: 20,
		backgroundColor: "rgba(239, 239, 239, 1)",
		borderRadius: 100,
		width: 35,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center'
	}




})
