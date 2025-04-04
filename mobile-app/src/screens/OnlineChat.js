import React,{useState, useEffect, useCallback} from "react";
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import {
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ImageBackground,
  Keyboard
} from "react-native";
import { colors } from "../common/theme";
import i18n from 'i18n-js';
const { height, width } = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';
import { api } from 'common';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();

export default function OnlineChat(props) {
  const {
    fetchChatMessages, 
    sendMessage, 
    stopFetchMessages
  } = api;
  const dispatch = useDispatch();
  const { bookingId ,status  } = props.route.params;
  const activeBookings = useSelector(state => state.bookinglistdata.active);
  const [curBooking, setCurBooking] = useState(null);
  const auth = useSelector(state => state.auth);
  const chats = useSelector(state=>state.chatdata.messages);

  const [allChat, setallChat] = useState([]);

  useEffect(()=>{
    if (chats) {
      setallChat(chats);
    }
  },[chats]);

  const { t }=i18n;
  const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;

  const [role,setRole] = useState();

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(()=>{
      if(auth.profile && auth.profile.usertype){
          setRole(auth.profile.usertype);
      } else{
          setRole(null);
      }
  },[auth.profile]);

  useEffect(() => {
    if (activeBookings && activeBookings.length >= 1) {
      let booking = activeBookings.filter(booking => booking.id == bookingId)[0];
      setCurBooking(booking);
    }
  }, [activeBookings]);


  const onSend = useCallback(async (messages = [], role, curBooking) => {
    await dispatch(sendMessage({
      booking:curBooking,
      role:role,
      message:messages[0].text
    }));
    dispatch(fetchChatMessages());
  }, [])

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (allChat && allChat.length >= 1) {
      let arr = [];
      for(let i = allChat.length - 1 ; i >= 0; i--){
        arr.push({
          _id:allChat[i].smsId,
          text: allChat[i].message,
          createdAt: allChat[i].createdAt ? new Date(allChat[i].createdAt) : new Date(),
          user: {
            _id: role && role == "driver" ? allChat[i].source  == "customer" ? 2 : 1 : allChat[i].source  == "customer" ? 1 : 2,
          }
        });
      }
      setMessages(arr);
    }else {
      setMessages([]);
    }
  }, [allChat]);

  useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        dispatch(fetchChatMessages(bookingId));
      });
      return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
      const unsubscribe = props.navigation.addListener('blur', () => {
        dispatch(stopFetchMessages(bookingId));
      });
      return unsubscribe;
  }, [props.navigation]);

  const renderBubble = (props) => {
    return(
      <Bubble
        {...props}
        wrapperStyle={{
          left:{
            backgroundColor: colors.new1,
            marginLeft: -45,
          },
          right:{
            backgroundColor: colors.new2,
            marginLeft: -45,
          }
        }}
        textStyle={{
          left:{
            color: colors.BLACK
          }
        }} 
      />
    );
  }

  const renderSend = (props) =>{
    return (
      <Send
        {...props}
        containerStyle={{
          height: 50,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <MaterialCommunityIcons name="send-circle" size={36} color={colors.PAYMENT_BUTTON_BLUE} />
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () =>{
    return (
      <FontAwesome name="angle-double-down" size={30} color={colors.PAYMENT_BUTTON_BLUE}  />
    );
  }

  return (
      <View style={{flex: 1}} >
        { __DEV__ ? 
          <View style={{ flex: 1, marginTop: -20, marginBottom: Platform.OS === 'ios' && hasNotch ? -30 : null }}>
            <GiftedChat
              placeholder={status === "COMPLETE" ? `${t('booking_is')} ${status}. ${t('not_chat')}` : t('chat_input_title')}
              messages={messages}
              onSend={messages => onSend(messages, role, curBooking)}
              user={{
                _id: 1,
              }}
              renderBubble={renderBubble}
              renderSend={renderSend}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent} 
              textInputProps={{
                editable: status !== "COMPLETE"
              }}
            />
          </View>
        : Platform.OS === 'android'?
          <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1}}>
            <GiftedChat
              placeholder={status === "COMPLETE" ? `${t('booking_is')} ${status}. ${t('not_chat')}` : t('chat_input_title')}
              messages={messages}
              onSend={messages => onSend(messages, role, curBooking)}
              user={{
                _id: 1,
              }}
              renderBubble={renderBubble}
              renderSend={renderSend}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent} 
              textInputProps={{
                editable: status !== "COMPLETE"
              }}
            />
          </KeyboardAvoidingView>
          :
          <View style={{ flex: 1, marginBottom: hasNotch ? -30 : null, marginTop: -20}}>
            <GiftedChat
              placeholder={status === "COMPLETE" ? `${t('booking_is')} ${status}. ${t('not_chat')}` : t('chat_input_title')}
              messages={messages}
              onSend={messages => onSend(messages, role, curBooking)}
              user={{
                _id: 1,
              }}
              renderBubble={renderBubble}
              renderSend={renderSend}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent} 
              textInputProps={{
                editable: status !== "COMPLETE"
              }}
            />
          </View>
        }     
      </View>
  )
}
