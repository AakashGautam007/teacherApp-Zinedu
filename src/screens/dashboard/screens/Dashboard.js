import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AuthContext } from "../../../utils/context";
import { width, postAnalytics } from "../../../utils/config";
import styles from "../styles";
import { STYLES } from "../../../appStyles";
import { Badge } from "../components/Badge";
import { useAuthFields } from "../../../AppUtils/hooks/useAuthFields";
import { GET_LEVEL_PERMISSIONS, GET_REVIEW_QUESTION_COUNT, GET_VISIBILITY_CHECK_COUNT } from "../api";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicatorComponent } from "../../../components/ActivityIndicatorComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useCheckCodepushUpdate } from "../../../AppUtils/hooks/useCheckCodepushUpdate";

const Dashboard = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { checkCodePushUpdate } = useCheckCodepushUpdate();

  const [loading, setLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [visibilityCheckCount, setVisibilityCheckCount] = useState(0);
  const [approveModal, setApproveModal] = useState(false);
  const [l1AndL2Permission, setL1AndL2Permission] = useState(false);
  const [l3Permission, setL3Permission] = useState(false);

  const getReviewQuestionCount = async () => {
    setLoading(true);
    const response = await GET_REVIEW_QUESTION_COUNT();
    // console.log('1', JSON.stringify(response))
    setReviewCount(response?.payload[0]?.num_pending_questions);
    setLoading(false);
  };

  const getVisibilityCheckCount = async () => {
    setLoading(true);
    const response = await GET_VISIBILITY_CHECK_COUNT();
    // console.log('2', JSON.stringify(response))
    setVisibilityCheckCount(response?.payload[0]?.num_pending_questions);
    setLoading(false);
  };

  const getPermissions = async () => {
    setLoading(true);
    const response = await GET_LEVEL_PERMISSIONS();
    console.log('2', JSON.stringify(response))
    if (response?.status) {
      const { is_l1_allowed, is_l2_allowed, is_l3_allowed } = response?.payload[0]
      setL1AndL2Permission(is_l1_allowed || is_l2_allowed)
      setL3Permission(is_l3_allowed)
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      Promise.all[
        (getReviewQuestionCount(),
          getVisibilityCheckCount(),
          getPermissions(),
          checkCodePushUpdate())
      ];
    }, [])
  );


  const resetModal = () => {
    setApproveModal(false);
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ActivityIndicatorComponent animating={loading} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={approveModal}
        onRequestClose={resetModal}
      // style={{ margin: 0, flex: 1 }}
      >
        <View style={styles.modalParentContainer}>
          <View style={styles.modalContainer}>
            <ActivityIndicatorComponent animating={loading} />

            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.approveRejectContainer}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={resetModal}
              >
                <Text style={styles.approveText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.approveButton,
                  {
                    backgroundColor: "#2B3789",
                    marginLeft: 10,
                    marginRight: -10,
                  },
                ]}
                onPress={() => {
                  logout();
                  resetModal();
                }}
              >
                <Text style={[styles.approveText, { color: "white" }]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ backgroundColor: "white", width }}>
        <View style={styles.headerParentContainer}>
          <View style={styles.headerContainer}>
            {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
                            <Image source={require('../../../assets/menu.png')} style={{ height: 44, width: 44, marginHorizontal: 8, marginVertical: 14 }} />
                        </TouchableOpacity> */}
            <Image source={require('../../../assets/my-faculty-logo/index.png')}
              resizeMethod='scale'
              resizeMode='contain'
              style={{ width: 150, height: 35.08, marginLeft: 8 }} />
          </View>
          <TouchableOpacity onPress={() => setApproveModal(true)}>
            <MaterialIcons name='logout' color={'#5B5B5B'} size={25} style={{ marginRight: 16 }} />
          </TouchableOpacity>

          {/* <Image source={require('../../../assets/bell.png')} style={{ width: 22, height: 26, marginRight: 14 }} /> */}
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.viewScheduleCardParentContainer}>
          <View style={styles.viewScheduleCardContainer}>
            <Text style={styles.classesText}>Classes</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyScheduleStack")}
            >
              <View style={styles.viewSchedule}>
                <Text style={styles.viewScheduleText}>View Schedule</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {/* <TouchableOpacity 
                style={{width:'45%',justifyContent:'center',alignItems: 'center',backgroundColor:'#ECECEC',height:157,borderRadius:30}} >
                <View >

                    <Text>
                        DPP
                    </Text>
                </View>
                </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("DoubtStack")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Student Doubts</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('SearchQuestionStack')}
            style={styles.card}
          >
            <Text style={styles.cardText}>Search Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PastClassesStack')}
            style={styles.card}
          >
            <Text style={styles.cardText}>
              My Past Classes
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.questionVerificationParentContainer}>
          <Text style={styles.questionVerificationText}>
            Question Verification
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.questionVerificationContainer}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('SearchQuestionStack')}
                disabled={!l1AndL2Permission}
                onPress={() => {
                  reviewCount == 0 ?
                    navigation.navigate('Congrats')
                    :
                    navigation.navigate('Filter')
                }}
                style={!l1AndL2Permission ? styles.questionVerificationInactiveCard : styles.questionVerificationActiveCard}>
                {l1AndL2Permission && <Badge
                  count={reviewCount}
                  viewStyle={{
                    position: 'absolute',
                    top: -8,
                    right: -10,
                  }}
                />}
                <Text style={!l1AndL2Permission ? styles.cardInactiveText : styles.cardText}>
                  Review Question
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.questionVerificationContainer}>
              <TouchableOpacity
                disabled={!l3Permission}
                onPress={() => {
                  visibilityCheckCount == 0 ?
                    navigation.navigate('Congrats')
                    :
                    // navigation.navigate('CheckQuestion')
                    navigation.navigate('CheckQuestionNew')
                }}

                style={!l3Permission ? styles.questionVerificationInactiveCard : styles.questionVerificationActiveCard} >
                {l3Permission && <Badge
                  count={visibilityCheckCount}
                  viewStyle={{
                    position: 'absolute',
                    top: -8,
                    right: -10,
                  }}
                />}
                <Text style={!l3Permission ? styles.cardInactiveText : styles.cardText}>
                  Visibility Check
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
