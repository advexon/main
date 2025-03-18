import { React } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { colors } from './theme';
import { Icon } from 'react-native-elements'
import i18n from 'i18n-js';
import { api } from 'common';
import DeliveryModal from '../components/DeliveryModal';
var { height, width } = Dimensions.get('window');
import { Button } from 'react-native-elements';
import { fonts } from './font';
import {Tooltip } from 'react-native-elements';
import { useState } from 'react';
import { getLangKey } from 'common/src/other/getLangKey';


export const MAIN_COLOR = colors.DELIVERYPRIMARY;
export const SECONDORY_COLOR = colors.DELIVERYSECONDORY;

export const appConsts = {
    needEmergemcy: false,
    hasMultiDrop: true,
    makePending: false,
    hasOptions: true,
    checkWallet: true,
    acceptWithAmount: false,
    hasStartOtp: false,
    canCall: false,
    showBookingOptions: true,
    captureBookingImage: true
}

export const checkSearchPhrase = (str) => {
    return "";
}

export const FormIcon = (props)=>{
    return  <Icon
        name='truck-fast'
        type='material-community'
        color={colors.HEADER}
        size={18}
        containerStyle={{width: '15%',alignItems: 'center'}}
    />
}

export const CarHorizontal = (props) => {
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const {onPress, carData, settings, styles} = props;
    const [open, setOpen] = useState(false);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };

    return (
        <TouchableOpacity onPress={onPress} style={{height:'100%'}}>
            <View style={styles.imageStyle}>
                <Image resizeMode="contain" source={carData.image ? { uri: carData.image } : require('../../assets/images/microBlackCar.png')} style={styles.imageStyle1} />
            </View>
            <View style={styles.textViewStyle}>
            <Text style={styles.text1}>{t(getLangKey(carData.name.toUpperCase()))}</Text>
                {
                    carData.extra_info && carData.extra_info != '' ?
                    <View style={{flexDirection:"row", justifyContent:'center',alignItems:'center'}}> 
                        <View style={{ justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center',marginTop:5 }}>
                        {
                            carData.extra_info.split(',').map((ln) => <Text style={styles.text2} key={ln} >{truncateText(ln, 12)}</Text>)
                        }
                        </View>
                        <Tooltip style={{ marginLeft: 3, marginRight: 3 }}
                            backgroundColor={"#ffff"}
                            visible={open}
                            overlayColor={'rgba(50, 50, 50, 0.70)'}
                            height={100 + 30 * (carData.extra_info.split(',').length)}
                            width={100 + 30 * (carData.extra_info.split(',').length)}
                            skipAndroidStatusBar={true}
                            containerStyle={{height:"auto",maxWidth:width-20}}
                            onOpen={() => {
                                setOpen(true);
                              }}
                              onClose={() => {
                                setOpen(false);
                              }}
                            popover={
                                <View style={{ flexDirection: 'column' , gap:20,width:"100%",height:"100%" }}>
                                    {
                                        carData.extra_info.split(',').map((ln) => <Text style={{fontFamily:fonts.Regular}} key={ln} >{ln}</Text>)
                                    }
                                </View>
                            }>
                            <Icon
                                name='information-circle-outline'
                                type='ionicon'
                                color='#517fa4'
                                size={20}
                                />
                        </Tooltip>
                    </View>

                            : null
                }
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop:5 }}>
                        {isRTL ?
                            null :
                            settings.swipe_symbol === false ?
                                <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                                :
                                <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>

                        }
                        {isRTL ?
                            settings.swipe_symbol === false ?
                                <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                                :
                                <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                            : null}
                    </View>
                <View>
                    <Text style={styles.text2}>({carData.minTime != '' ? carData.minTime : t('not_available')})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const CarVertical = (props) =>{
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const {onPress, carData, settings, styles} = props;
    return (
        <TouchableOpacity
            style={[styles.carContainer, { borderWidth: 1, borderColor: carData.active == true ? colors.DELIVERYPRIMARY : colors.WHITE,flexDirection:isRTL?'row-reverse':'row'}]}
            onPress={onPress}
        >
            <Image
                source={carData.image ? { uri: carData.image } : require('../../assets/images/microBlackCar.png')}
                resizeMode="contain"
                style={styles.cardItemImagePlace}
            ></Image>
            <View style={[styles.bodyContent, {flexDirection: 'column',}]}>
            <Text style={[styles.titleStyles,{textAlign:isRTL?'right':'left'}]}>{t(getLangKey(carData.name.toUpperCase()))}</Text>
                <View style={{ flexDirection:isRTL?'row-reverse':'column',}}>
                    {settings.swipe_symbol === false ?
                        <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                        :
                        <Text style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                    }
                    {carData.extra_info && carData.extra_info != '' ?
                        <View style={{ justifyContent: 'space-around', marginLeft: 3 ,width: width-180}}>
                            {
                                carData.extra_info.split().map((ln) => <Text key={ln} style={[styles.text2, { fontFamily:fonts.Bold, color: colors.MAP_TEXT, textAlign: isRTL ? 'right': 'left' }]} >{ln}</Text>)
                            }
                        </View>
                    : null}
                </View>
                <Text style={[styles.text2,{textAlign:isRTL?'right':'left'}]}>({carData.minTime != '' ? carData.minTime : t('not_available')})</Text>
            </View>
        </TouchableOpacity>
    )
}

export const validateBookingObj = async (t, addBookingObj, instructionData, settings, bookingType, roundTrip, tripInstructions, tripdata, drivers, otherPerson) => {
    const {
        getDistanceMatrix,
        GetDistance,
    } = api;
      addBookingObj['instructionData'] = instructionData;
      if (settings.autoDispatch && bookingType == false) {
        let preRequestedDrivers = {};
        let requestedDrivers = {};
        let driverEstimates = {};
        let startLoc = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
        let distArr = [];
        let allDrivers = [];
        if(drivers && drivers.length > 0){
            for (let i = 0; i < drivers.length; i++) {
                let driver = { ...drivers[i] };
                let distance = GetDistance(tripdata.pickup.lat, tripdata.pickup.lng, driver.location.lat, driver.location.lng);
                if (settings.convert_to_mile) {
                    distance = distance / 1.609344;
                }
                if (distance < ((settings && settings.driverRadius) ? settings.driverRadius : 10) && driver.carType === tripdata.carType.name) {
                    driver["distance"] = distance;
                    allDrivers.push(driver);
                }
            }
            const sortedDrivers = settings.useDistanceMatrix ? allDrivers.slice(0, 25) : allDrivers;
            if (sortedDrivers.length > 0) {
                let driverDest = "";
                for (let i = 0; i < sortedDrivers.length; i++) {
                    let driver = { ...sortedDrivers[i] };
                    driverDest = driverDest + driver.location.lat + "," + driver.location.lng
                    if (i < (sortedDrivers.length - 1)) {
                        driverDest = driverDest + '|';
                    }
                }
                if (settings.useDistanceMatrix) {
                    distArr = await getDistanceMatrix(startLoc, driverDest);
                } else {
                    for (let i = 0; i < sortedDrivers.length; i++) {
                        distArr.push({ timein_text: ((sortedDrivers[i].distance * 2) + 1).toFixed(0) + ' min', found: true })
                    }
                }
                for (let i = 0; i < sortedDrivers.length; i++) {
                    if (distArr[i].found) {
                        let driver = {}
                        driver.id = sortedDrivers[i].id;
                        driver.distance = sortedDrivers[i].distance;
                        driver.timein_text = distArr[i].timein_text;
                        if(addBookingObj.deliveryWithBid){
                            requestedDrivers[driver.id] = true;
                        }else{
                            preRequestedDrivers[driver.id] = true;
                        }
                        driverEstimates[driver.id] = {distance: driver.distance, timein_text :  driver.timein_text};
                    }
                }
                addBookingObj['preRequestedDrivers'] = preRequestedDrivers;
                addBookingObj['requestedDrivers'] = requestedDrivers;
                addBookingObj['driverEstimates'] = driverEstimates;
            }
        } else{
            return { error: true, msg : t('no_driver_found_alert_messege')}
        }
      }
      return { addBookingObj };
}

export default function BookingModal(props){
    return <DeliveryModal {...props} />
}

export const prepareEstimateObject =  async (tripdata, instructionData) => {
    const { t } = i18n;
    const {
        getDirectionsApi
    } = api;
    try {
        const startLoc = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
        const destLoc = tripdata.drop.lat + ',' + tripdata.drop.lng;
        let routeDetails = await getDirectionsApi(startLoc, destLoc, null);
        let waypoints = '';
        if (tripdata.drop && tripdata.drop.waypoints && tripdata.drop.waypoints.length > 0) {
            const origin = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
            const arr = tripdata.drop.waypoints;
            for (let i = 0; i < arr.length; i++) {
                waypoints = waypoints + arr[i].lat + ',' + arr[i].lng;
                if (i < arr.length - 1) {
                    waypoints = waypoints + '|';
                }
            }
            const destination = tripdata.drop.lat + ',' + tripdata.drop.lng;
            routeDetails = await getDirectionsApi(origin, destination, waypoints);
        } else {
            routeDetails = await getDirectionsApi(startLoc, destLoc, null);
        }
        const estimateObject = {
            pickup: { coords: { lat: tripdata.pickup.lat, lng: tripdata.pickup.lng }, description: tripdata.pickup.add },
            // drop: { coords: { lat: tripdata.drop.lat, lng: tripdata.drop.lng }, description: tripdata.drop.add},
            drop: { coords: { lat: tripdata.drop.lat, lng: tripdata.drop.lng }, description: tripdata.drop.add, waypointsStr: waypoints != '' ? waypoints : null, waypoints: waypoints != '' ? tripdata.drop.waypoints : null },
            carDetails: tripdata.carType,
            routeDetails: routeDetails,
            instructionData: instructionData
        };
        return { estimateObject };
    } catch (err) {
        return { error: true, msg : t('not_available')}
    }
}

export const ExtraInfo = (props) => {
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const {estimate, item, uid, amount, setAmount, styles, onPressAccept} = props;
    const nextPrice = parseFloat(parseFloat(item.estimate) + parseFloat((item.estimate * 10)/100)).toFixed(2);
    const prePrice = parseFloat(parseFloat(item.estimate) - parseFloat((item.estimate * 10)/100)).toFixed(2);
    return (
        <>
      
            <View style={styles.textContainerStyle}>
                <Text style={styles.textHeading}>{t('pickUpInstructions')}</Text>
                <Text style={styles.textContent}>
                    {item? item.pickUpInstructions : ''}
                </Text>
            </View>
            <View style={[styles.textContainerStyle]}>
                <Text style={styles.textHeading}>{t('deliveryInstructions')}</Text>
                <Text style={styles.textContent}>
                    {item? item.deliveryInstructions : ''}
                </Text>
            </View>
            <View style={[styles.deliveryOption,{flexDirection: isRTL ? 'row-reverse' : 'row',}]}>
            { item?.parcelTypeSelected?.description && (
                <View style={{width:width/3,alignItems:'center'}}>
                    <Text style={styles.textHeading}>{t('parcel_type')}</Text>
                    <Text style={styles.textContent}> 
                        {item && item.parcelTypeSelected? t(getLangKey(item.parcelTypeSelected.description)) : ''}
                    </Text>
               </View>
            )} 
            {item?.optionSelected?.description && ( 
                <View style={{width:width/3,alignItems:'center'}}>
                    <Text style={styles.textHeading}>{t('options').toUpperCase()}</Text>
                    <Text style={styles.textContent}> 
                        {item && item.optionSelected? t(getLangKey(item.optionSelected.description)) : ''}
                    </Text>
                </View>
            )}
            <View style={{width:width/3,alignItems:'center'}}>
                <Text style={styles.textHeading}>{t('payment_mode')}</Text>
                <Text style={styles.textContent}>
                {t(item.payment_mode)}
                </Text>
            </View>
            </View>
                {item.deliveryWithBid  ? 
                    <>
                        {item.status == 'NEW' && !(item.driverOffers && item.driverOffers[uid]) ?
                            <View style={{flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent:'space-evenly', alignItems: 'center', marginTop:10 }}>
                                <Button
                                    onPress={()=> {
                                        let allAmts = {...amount};
                                        allAmts[item.id] = prePrice;
                                        setAmount(allAmts);
                                        onPressAccept(item, prePrice); 
                                    }}
                                    title={prePrice}
                                    buttonStyle={{
                                        backgroundColor:MAIN_COLOR,
                                        minHeight: 45,
                                        padding: 2,
                                        borderColor: colors.TRANSPARENT,
                                        borderWidth: 0,
                                        borderRadius: 10,
                                    }}
                                    titleStyle={{
                                        alignSelf: 'center',
                                        padding:10
                                    }}
                                />
                                <Button
                                    onPress={()=> {
                                        let allAmts = {...amount};
                                        allAmts[item.id] = item.estimate;
                                        setAmount(allAmts);
                                        onPressAccept(item, item.estimate);
                                    }}
                                    title={item.estimate}
                                    buttonStyle={{
                                        backgroundColor: MAIN_COLOR,
                                        minHeight: 45,
                                        padding: 2,
                                        borderColor: colors.TRANSPARENT,
                                        borderWidth: 0,
                                        borderRadius: 10,
                                    }}
                                    titleStyle={{
                                        alignSelf: 'center',
                                        padding:10
                                    }}
                                />
                                <Button
                                    onPress={()=> {
                                        let allAmts = {...amount};
                                        allAmts[item.id] =nextPrice;
                                        setAmount(allAmts);
                                        onPressAccept(item, nextPrice);
                                    }}
                                    title={nextPrice}
                                    buttonStyle={{
                                        backgroundColor: MAIN_COLOR,
                                        minHeight: 45,
                                        padding: 2,
                                        borderColor: colors.TRANSPARENT,
                                        borderWidth: 0,
                                        borderRadius: 10,
                                    }}
                                    titleStyle={{
                                        alignSelf: 'center',
                                        padding:10
                                    }}
                                />
                            </View>
                        :null}


                        {item.status == 'NEW' && !(item.driverOffers && item.driverOffers[uid])?
                                <View style={styles.box}>
                                <TextInput
                                    style={[styles.dateTextStyle,{ textAlign: isRTL ? "right" : "left" }]}
                                    placeholder={t('amount')}
                                    onChangeText={(value) => {
                                        let allAmts = {...amount};
                                        allAmts[item.id] = value;
                                        setAmount(allAmts)
                                    }}
                                    value={amount[item.id] && !isNaN(amount[item.id])?amount[item.id].toString():null}
                                    keyboardType="number-pad"
                                />
                            </View>
                        : null}
                    </>
                :null}
        </>
    )
}

export const RateView = (props) => {
    const {settings, item, styles ,uid} = props;
    return (
        <View style={styles.rateViewStyle}>
        {item.deliveryWithBid ?
            item && item.driverOffers && item.driverOffers[uid] ?
            <View style={styles.rateViewStyle}>
            {settings.swipe_symbol === false ?
                <Text style={styles.rateViewTextStyle}>{settings.symbol}{parseFloat(item.driverOffers[uid].trip_cost).toFixed(2)}</Text>
                :
                <Text style={styles.rateViewTextStyle}>{parseFloat(item.driverOffers[uid].trip_cost).toFixed(2)}{settings.symbol}</Text>
            }
            </View>
        
        : null :
            settings.swipe_symbol === false ?
                <Text style={styles.rateViewTextStyle}>{settings.symbol}{item ? item.estimate > 0 ? parseFloat(item.estimate).toFixed(settings.decimal) : 0 : null}</Text>
                :
                <Text style={styles.rateViewTextStyle}>{item ? item.estimate > 0 ? parseFloat(item.estimate).toFixed(settings.decimal) : 0 : null}{settings.symbol}</Text>
        }
        </View>
    )
}