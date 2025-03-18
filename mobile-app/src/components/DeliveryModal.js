import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import { TouchableOpacity as OldTouch } from 'react-native';
import { colors } from '../common/theme';
import i18n from 'i18n-js';
import { Input, Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import OtherPerson from './OtherPerson';
import { fonts } from '../common/font';

export const MAIN_COLOR = colors.DELIVERYPRIMARY;
export const SECONDORY_COLOR = colors.DELIVERYSECONDORY;

export default function DeliveryModal(props) {
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const { settings, estimate, bookingModalStatus, onPressCancel, bookNow, instructionData, setInstructionData, payment_mode, setPaymentMode, radioProps, profileData, setProfileData, auth, bookModelLoading, deliveryWithBid, setDeliveryWithBid, otherPerson, setOtherPerson } = props;

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={bookingModalStatus}
    >
        <View style={styles.centeredView}>
        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS == "ios" ? "padding" : (__DEV__ ? null : "padding" )}>
                <View style={[styles.modalView,{maxHeight: otherPerson ? 550 : (settings.bookingFlow == 0?  380 : 400)}]}>
                    {estimate && settings && settings.bookingFlow == 1  ?
                        <View style={styles.rateViewStyle}>
                            {settings.swipe_symbol===false?
                                <Text style={styles.rateViewTextStyle}>{settings.symbol}{estimate.estimateFare > 0 ? parseFloat(estimate.estimateFare).toFixed(settings.decimal) : 0}</Text>
                                :
                                <Text style={styles.rateViewTextStyle}>{estimate.estimateFare > 0 ? parseFloat(estimate.estimateFare).toFixed(settings.decimal) : 0}{settings.symbol}</Text>
                            }
                        </View>
                    : null}
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {auth && auth.profile && !auth.profile.firstName?
                    <View style={styles.textInputContainerStyle}>
                        <Input
                            editable={true}
                            underlineColorAndroid={colors.TRANSPARENT}
                            placeholder={t('first_name_placeholder')}
                            placeholderTextColor={colors.DRIVER_TRIPS_TEXT}
                            value={profileData.firstName}
                            keyboardType={'email-address'}
                            inputStyle={[styles.inputTextStyle,{textAlign:isRTL?"right":'left'}]}
                            onChangeText={(text) => { setProfileData({ ...profileData, firstName: text }) }}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.textInputStyle}
                        />
                    </View>
                    : null }
                    {auth && auth.profile && !auth.profile.lastName ?
                    <View style={styles.textInputContainerStyle}>
                        <Input
                            editable={true}
                            underlineColorAndroid={colors.TRANSPARENT}
                            placeholder={t('last_name_placeholder')}
                            placeholderTextColor={colors.DRIVER_TRIPS_TEXT}
                            value={profileData.lastName}
                            keyboardType={'email-address'}
                            inputStyle={[styles.inputTextStyle,{textAlign:isRTL?"right":'left'}]}
                            onChangeText={(text) => { setProfileData({ ...profileData, lastName: text }) }}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.textInputStyle}
                        />
                    </View>
                    : null }
                    {auth && auth.profile && !auth.profile.email ?
                    <View style={styles.textInputContainerStyle}>
                        <Input
                            editable={true}
                            underlineColorAndroid={colors.TRANSPARENT}
                            placeholder={t('email_placeholder')}
                            placeholderTextColor={colors.DRIVER_TRIPS_TEXT}
                            value={profileData.email}
                            keyboardType={'email-address'}
                            inputStyle={[styles.inputTextStyle,{textAlign:isRTL?"right":'left'}]}
                            onChangeText={(text) => { setProfileData({ ...profileData, email: text }) }}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.textInputStyle}
                            autoCapitalize='none'
                        />
                    </View>
                    : null }

                    <OtherPerson
                        otherPerson = {otherPerson}
                        setOtherPerson={setOtherPerson}
                        setInstructionData={setInstructionData}
                        instructionData={instructionData}
                        auth={auth}
                    />

                    <View style={styles.textInputContainerStyle}>
                        <Input
                            editable={true}
                            underlineColorAndroid={colors.TRANSPARENT}
                            placeholder={t('pickUpInstructions')}
                            placeholderTextColor={colors.DRIVER_TRIPS_TEXT}
                            value={instructionData.pickUpInstructions}
                            keyboardType={'email-address'}
                            inputStyle={[styles.inputTextStyle,{textAlign:isRTL?"right":'left'}]}
                            onChangeText={(text) => { setInstructionData({ ...instructionData, pickUpInstructions: text }) }}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.textInputStyle}
                        />
                    </View>
                    <View style={styles.textInputContainerStyle}>
                        <Input
                            editable={true}
                            underlineColorAndroid={colors.TRANSPARENT}
                            placeholder={t('deliveryInstructions')}
                            placeholderTextColor={colors.DRIVER_TRIPS_TEXT}
                            value={instructionData.deliveryInstructions}
                            keyboardType={'email-address'}
                            inputStyle={[styles.inputTextStyle,{textAlign:isRTL?"right":'left'}]}
                            onChangeText={(text) => { setInstructionData({ ...instructionData, deliveryInstructions: text }) }}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.textInputStyle}
                        />
                    </View>
                 </ScrollView>
                    {settings.bookingFlow == 0 ?
                    <View>
                    <Text style={{ color: colors.BLACK, fontFamily:fonts.Bold, fontSize: 16,textAlign:isRTL? 'right':'left',marginLeft:isRTL?0:10, marginRight:isRTL?10:0 }}>{t('booking_flow')}</Text>
                        <RadioForm
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={false}
                            buttonColor={MAIN_COLOR}
                            labelColor={colors.RADIO_BUTTON}
                            style={{ marginTop: 10 }}
                            labelStyle={{ marginLeft: 0 }}
                            selectedButtonColor={colors.HEADER}
                            selectedLabelColor={colors.HEADER}
                        >
                            <RadioButton labelHorizontal={true} style={{flexDirection:isRTL?'row-reverse':'row',marginLeft:isRTL?0:0, marginRight:isRTL?0:0}}>
                                <RadioButtonInput
                                    obj={{ label: t('system_price'), value: 1}}
                                    isSelected={!deliveryWithBid}
                                    onPress={()=>setDeliveryWithBid(false)}
                                    buttonSize={15}
                                    buttonOuterSize={26} 
                                    buttonWrapStyle={{marginLeft: 10}}
                                    buttonColor={MAIN_COLOR}
                                    
                                />
                                <RadioButtonLabel
                                    obj={{ label: t('system_price'), value: 1}}
                                    labelHorizontal={true}
                                    onPress={()=>setDeliveryWithBid(false)}
                                    selectedLabelColor={colors.RADIO_BUTTON}
                                    labelColor={colors.HEADER}
                                    labelStyle={{fontFamily:fonts.Regular}}
                                />
                            </RadioButton>
                            <RadioButton labelHorizontal={true} style={{flexDirection:isRTL?'row-reverse':'row',marginLeft:isRTL?0:20, marginRight:isRTL?20:0}}>
                                <RadioButtonInput
                                    obj={{ label: t('bid'), value: 0}}
                                    isSelected={deliveryWithBid}
                                    onPress={()=>setDeliveryWithBid(true)}
                                    buttonSize={15}
                                    buttonOuterSize={26} 
                                    buttonWrapStyle={{marginLeft: 10}}
                                    buttonColor={MAIN_COLOR}
                                    selectedButtonColor={colors.HEADER}
        
                                />
                                <RadioButtonLabel
                                    obj={{ label: t('bid'), value: 0}}
                                    labelHorizontal={true}
                                    onPress={()=>setDeliveryWithBid(true)}
                                    selectedLabelColor={colors.HEADER}
                                    labelColor={colors.HEADER}
                                    labelStyle={{ fontFamily:fonts.Regular }}
                                />
                            </RadioButton>
                        </RadioForm>
                        </View>
                        :null}
                    
                    <View style={styles.textInputContainerStyle}>
                        <Text style={{ color: colors.BLACK, fontWeight: 'bold', fontSize: 16, textAlign:isRTL? 'right':'left', marginVertical: 5, paddingLeft:10}}>{t('payment_mode')}</Text>
                    </View>
                    <View style={styles.textInputContainerStyle}>
                        <RadioForm
                            radio_props={radioProps}
                            initial={payment_mode}
                            animation={false}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={MAIN_COLOR}
                            buttonSize={15}
                            buttonOuterSize={26} 
                            buttonWrapStyle={{marginLeft: 10}}
                            labelColor={colors.RADIO_BUTTON}
                            style={[{marginBottom: 20},isRTL ? { marginRight: 10 } : { marginLeft: 10 }]}
                            labelStyle={[isRTL ? { marginRight: 10 } : { marginRight: 10 },{fontFamily:fonts.Regular}]}
                            selectedButtonColor={MAIN_COLOR}
                            selectedLabelColor={colors.HEADER}
                            onPress={(value) => {
                                setPaymentMode(value);
                            }}
                        />
                    </View>
        
                    <View style={{ flexDirection:isRTL?'row-reverse':'row', alignSelf: 'center', height: 40 }}>
                        <OldTouch
                            loading={false}
                            onPress={onPressCancel}
                            style={[styles.modalButtonStyle,[isRTL?{marginLeft:5, backgroundColor: colors.RED}:{ marginRight: 5, backgroundColor: colors.RED}]]}
                        >
                            <Text style={styles.modalButtonTextStyle}>{t('cancel')}</Text>
                        </OldTouch>

                        <Button
                            title={t('confirm')}
                            loading={bookModelLoading}
                            loadingProps={{ size: "large", color: colors.WHITE }}
                            titleStyle={{fontFamily:fonts.Bold}}
                            onPress={bookNow}
                            buttonStyle={[styles.modalButtonStyle,{backgroundColor:colors.GREEN}]}
                            containerStyle={[styles.modalButtonStyle,{backgroundColor:colors.GREEN}]}
                        />
                    </View>
                
                </View>
            </KeyboardAvoidingView>
        </View>
    </Modal>
    );

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.BACKGROUND
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textInputContainerStyle: {
        flexDirection: 'row',
        alignItems: "center"
    },
    inputTextStyle:{
        fontFamily:fonts.Regular
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BACKGROUND_PRIMARY
    },
    textInputStyle: {
    },
    modalButtonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDORY_COLOR,
        width: 100,
        height: 40,
        elevation: 0,
        borderRadius: 10
    },
    modalButtonTextStyle: {
        color: colors.WHITE,
        fontFamily:fonts.Bold,
        fontSize: 18
    },
    rateViewStyle: {
        alignItems: 'center',
        alignSelf: 'center'
    },
    rateViewTextStyle: {
        fontSize: 50,
        color: colors.START_TRIP,
        fontFamily: fonts.Bold,
        textAlign: "center"
    }
});
