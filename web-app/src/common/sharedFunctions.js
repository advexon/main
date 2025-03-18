import React from 'react';
import moment from 'moment/min/moment-with-locales';
import { colors } from "../components/Theme/WebTheme";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  Radio,
  RadioGroup,
  Modal,
  FormLabel,
  Button
} from '@mui/material';
import { useTranslation } from "react-i18next";
import OtherPerson from 'components/OtherPerson';
import { getLangKey } from 'common/src/other/getLangKey';

export const calcEst = false;
export const showEst = true;
export const optionsRequired = true;

export const MAIN_COLOR = colors.DELIVERYPRIMARY;
export const SECONDORY_COLOR = colors.DELIVERYSECONDORY;

export const FONT_FAMILY =  '"Roboto", "Helvetica", "Arial", sans-serif';

export const bookingHistoryColumns = (role, settings, t, isRTL) => [
  { title: t('booking_ref'), field: 'reference'},
  { title: t('booking_date'), field: 'bookingDate', render: rowData => rowData.bookingDate?moment(rowData.bookingDate).format('lll'):null,},
  { title: t('car_type'), field: 'carType', render: rowData => rowData.carType?t(getLangKey(rowData.carType)):null},
  { title: t('assign_driver'), field: 'driver_name', },
  { title: t('booking_status_web'), field: 'status',
   render: rowData => 
  <div
  style={{backgroundColor:rowData.status === "CANCELLED"?colors.RED :rowData.status=== "COMPLETE"?colors.GREEN : colors.YELLOW, color:"white", padding:7, borderRadius:"15px", fontWeight:"bold", width:"150px", margin: 'auto' }}
  >{t(rowData.status)}</div>,  },
  { title: t('booking_type'), field: 'booking_type',  render: rowData => <div>{rowData.deliveryWithBid ? t("bid") : t("system_price")}</div> },
  { title: t('otp'), field: 'otp',  render: rowData => <div>{rowData.otp ? rowData.otp : t("false")}</div> },
  { title: t('trip_cost'), field: 'trip_cost',
  render: (rowData) =>role === 'customer' && (['NEW','PAYMENT_PENDING'].indexOf(rowData.status) !== -1) ?  t('bid').toUpperCase() : 
  rowData.trip_cost
  ? settings.swipe_symbol
  ? rowData.trip_cost + " " + settings.symbol
  : settings.symbol + " " + rowData.trip_cost
: settings.swipe_symbol
  ? "0 " + settings.symbol
  : settings.symbol + " 0",
 },
];

export const BookingModalBody = (props) => {
    const { t, i18n  } = useTranslation();
    const isRTL = i18n.dir();
    const { classes, instructionData, handleChange, auth, profileData, settings, deliveryWithBid, otherPerson, setOtherPerson } = props;
    return (
      <Grid item xs={12}>
        <span>
            <Typography component="h2" variant="h5" style={{marginTop:15, color:colors.BLACK, fontFamily:FONT_FAMILY}}>
                {t('delivery_information')}
            </Typography>
            {auth.profile.usertype === 'customer' && !auth.profile.firstName ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.firstName ? false : true }
                fullWidth
                id="firstName"
                label={t('firstname')}
                name="firstName"
                autoComplete="firstName"
                onChange={handleChange}
                value={profileData.firstName}
                autoFocus
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.lastName ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.lastName ? false : true }
                fullWidth
                id="lastName"
                label={t('lastname')}
                name="lastName"
                autoComplete="lastName"
                onChange={handleChange}
                value={profileData.lastName}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.email ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.email ? false : true }
                fullWidth
                id="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={profileData.email}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }

            <OtherPerson
              classes = {classes}
              otherPerson={otherPerson}
              handleChange={handleChange}
              setOtherPerson={setOtherPerson}
              instructionData={instructionData}
            />

            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                fullWidth
                id="pickUpInstructions"
                label={t('pickUpInstructions')}
                name="pickUpInstructions"
                autoComplete="pickUpInstructions"
                onChange={handleChange}
                value={instructionData.pickUpInstructions}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                fullWidth
                id="deliveryInstructions"
                label={t('deliveryInstructions')}
                name="deliveryInstructions"
                autoComplete="deliveryInstructions"
                onChange={handleChange}
                value={instructionData.deliveryInstructions}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            {settings.bookingFlow === "0" && auth.profile.usertype === 'customer' ? 
              <Grid item xs={12}>
             <RadioGroup row name="bookingFlow" value={deliveryWithBid} onChange={handleChange}>
               <FormControlLabel key={"key0"} value={0} control={<Radio />} label={ <Typography className={classes.typography}>{t('system_price')}</Typography>} />
               <FormControlLabel key={"key1"} value={1} control={<Radio />} label={ <Typography className={classes.typography}>{t('bid')}</Typography>} />
             </RadioGroup>
           </Grid>
            :null}
        </span>
      </Grid>
    )
}

export const validateBookingObj = (t, bookingObject, instructionData) => {
    delete bookingObject.driverEstimates;
    return { bookingObject };
}

export const PanicSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { classes, data, handleTextChange } = props;
  return (
      <span>
          <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left',fontFamily:FONT_FAMILY }}>
              {t('panic_num')}
          </Typography>
          <TextField
              InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
              variant="outlined"
              margin="normal"
              fullWidth
              id="panic"
              label={t('panic_num')}
              className={isRTL === "rtl" ? [classes.rootRtl_1, classes.right] : classes.textField}
              name="panic"
              autoComplete="panic"
              onChange={handleTextChange}
              value={data.panic}
          />
      </span>
  )
}

export const DispatchSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { autoDispatch, onChange } = props;
  return (
      <FormControlLabel
          style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
          control={
              <Switch
                  checked={autoDispatch}
                  onChange={onChange}
                  name="autoDispatch"
                  color="primary"
              />
          }
          label={ <Typography style={{fontFamily:FONT_FAMILY}}>{t('auto_dispatch')}</Typography>}
    />
  )
}

export const BookingImageSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { data, handleSwitchChange } = props;
  return (
      <span>
          <FormControlLabel
            style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            control={
              <Switch
                checked={data.AllowDeliveryPickupImageCapture}
                onChange={handleSwitchChange}
                name="AllowDeliveryPickupImageCapture"
                color="primary"
              />
            }
            label={ <Typography style={{fontFamily:FONT_FAMILY}}>{t('allow_del_pkp_img')}</Typography>}
          />
          <FormControlLabel
            style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            control={
              <Switch
                checked={data.AllowFinalDeliveryImageCapture}
                onChange={handleSwitchChange}
                name="AllowFinalDeliveryImageCapture"
                color="primary"
              />
            }
            label={ <Typography style={{fontFamily:FONT_FAMILY}}>{t('allow_del_final_img')}</Typography>}
          />
      </span>
  )
}

export const carTypeColumns = (t, isRTL, onClick) =>  [
  { title: t('name'), field: 'name',render: rowData => rowData.name? <Typography style={{fontFamily:FONT_FAMILY}}>{t(getLangKey(rowData.name))}</Typography>:null
  },
  { title: t('image'),  field: 'image',
    initialEditValue: 'https://cdn.pixabay.com/photo/2012/04/15/22/09/car-35502__480.png',
    render: rowData => rowData.image? <button onClick={()=>{onClick(rowData)}}><img alt='CarImage' src={rowData.image} style={{width: 50}}/></button>:null
  },
  { title: t('base_fare'), field: 'base_fare', type: 'numeric', 
   initialEditValue: 0 },
  { title: t('rate_per_unit_distance'), field: 'rate_per_unit_distance', type: 'numeric', 
   initialEditValue: 0},
  { title: t('rate_per_hour'), field: 'rate_per_hour', type: 'numeric', 
   initialEditValue: 0},
  { title: t('min_fare'), field: 'min_fare', type: 'numeric', 
  initialEditValue: 0},
  { title: t('convenience_fee'), field: 'convenience_fees', type: 'numeric', 
   initialEditValue: 0},
  {
    title: t('convenience_fee_type'),
    field: 'convenience_fee_type',
    lookup: { flat: t('flat'), percentage: t('percentage')},
  },
  {
    title: t('fleet_admin_comission'), field: 'fleet_admin_fee', type: 'numeric', 
   initialEditValue: 0
  },
  { title: t('extra_info'), field: 'extra_info' ,
},
  { title: t('position'), field: 'pos', type: 'numeric', defaultSort:'asc'}
];

export const acceptBid = (selectedBooking, selectedBidder) => {
  let bookingObj = {...selectedBooking};
  bookingObj.selectedBid = bookingObj.driverOffers[selectedBidder];
  const uid = bookingObj.selectedBid.driver;
  for(let key in bookingObj.driverOffers){
    if(key !== uid){
       delete  bookingObj.driverOffers[key];
    }
  }
  for(let key in bookingObj.requestedDrivers){
      if(key !== uid){
        delete  bookingObj.requestedDrivers[key];
      }
  }
  return bookingObj;
}

export const BidModal = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { ref, role, selectedBooking, bidModalStatus,handleBidModalClose, classes, settings, acceptBid, selectedBidder, handleChange } = props;
  return selectedBooking && selectedBooking.driverOffers && role==='customer'?
  <Modal
       disablePortal
       disableEnforceFocus
       disableAutoFocus
       open={bidModalStatus}
       onClose={handleBidModalClose}
       className={classes.modal}
       container={() => ref}
  >
      <Grid container spacing={2} className={classes.paper}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl component="fieldset">
              <FormLabel component="legend" style={{textAlign:isRTL=== 'rtl' ?'right':'left',fontFamily:FONT_FAMILY}}>{t('payment')}</FormLabel>
              <RadioGroup name="selectedBidder" value={selectedBidder} onChange={handleChange}>
              {Object.keys(selectedBooking.driverOffers).map(key => 
                  <FormControlLabel 
                  key={key} value={key} control={<Radio />} 
                  label={ <Typography className={classes.typography}>{selectedBooking.driverOffers[key].driver_name + " - " + (settings.swipe_symbol===false?settings.symbol:"") + selectedBooking.driverOffers[key].trip_cost + (settings.swipe_symbol?settings.symbol:"")} </Typography>}
                  />  
              )}
              </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}  style={{direction: isRTL=== 'rtl' ?'rtl' : 'ltr'}}>
          <Button onClick={handleBidModalClose} variant="contained" color="primary" style={{fontFamily:FONT_FAMILY}}>
          {t('cancel')}
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{...(isRTL === 'rtl' ? {marginRight: 10} : {marginLeft: 10}), fontFamily: FONT_FAMILY }} onClick={acceptBid}>
           {t('selectBid')}
          </Button>
          </Grid>
      </Grid>
  </Modal>
   :null
}

export const  downloadCsv = (data, fileName) => {
  const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  a.setAttribute("download", finalFileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const DeliveryFlow = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { data , handleChange } = props;
  return(
  <span>
    <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left',fontFamily:FONT_FAMILY }}>
        {t('booking_type')}
    </Typography>

    <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign:isRTL==='rtl'?'right':'left'}}>
      <FormControl component="fieldset">
      <RadioGroup  row name="booking_type" value={data} onChange={handleChange}>
          <FormControlLabel key={"key0"} value={0} control={<Radio />} label={ <Typography fontFamily={FONT_FAMILY}>{t('system_price_with_bid')}</Typography>}/>
          <FormControlLabel key={"key1"} value={1} control={<Radio />} label={ <Typography fontFamily={FONT_FAMILY}>{t('system_price')}</Typography>} />
          <FormControlLabel key={"key2"} value={2} control={<Radio />} label={ <Typography fontFamily={FONT_FAMILY}>{t('bid')}</Typography>} />
        </RadioGroup>
      </FormControl>
    </Grid>
  </span>
  )
} 

export const CustomerBidSettings = (props) => {
  return null;
}