
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SelectInfo from "../../components/ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import { Icon, CheckBox, Overlay } from "react-native-elements";
import { DialogContent, SlideAnimation } from "react-native-popup-dialog";
import {
  Input,
  Label,
  Switch,
  FormGroup,
  Fieldset,
  FieldsContainer,
  ActionsContainer,
  Select,
  Button,
} from "react-native-clean-form";
import Dialog from "react-native-dialog";
import MapView from "../../components/Mapa/JustMapa";
import SelectInput from "react-native-select-input-ios";
import * as theme from "../../../themes/clinics";
const { width, height } = Dimensions.get("window");
import { withNavigation } from "react-navigation";
import { AsyncStorage } from "react-native";





function Notification(props){

    const { navigation } = props;
    const OverlayExample = () => {
      const [visible, setVisible] = useState(false);
    
      const toggleOverlay = () => {
        setVisible(!visible);
      };
    
      return (
        <View>
    
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Cita Médica reservada!</Text>
          </Overlay>
        </View>
      );
    };
  }


  export default withNavigation (Notification);