
import RNPickerSelect from "react-native-picker-select";
import { Icon, CheckBox } from "react-native-elements";
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
import { withNavigation, DrawerItems } from "react-navigation";
import { StyleSheet, View, Image, Text ,SafeAreaView, TouchableOpacity} from "react-native";
//import { createDrawerNavigator } from '@react-navigation/drawer';

function Sesion (props){
   const { navigation } = props;
    const Drawer = DrawerNavigator(
    {
        mainpage:{screen:MyScreen}
    },
    {
    
      contentComponent:(props) => (
        <View style={{flex:1}}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <TouchableOpacity onPress={()=>
                Alert.alert(
                  'Log out',
                  'Do you want to logout?',
                  [
                    {text: 'Cancel', onPress: () => {return null}},
                    {text: 'Confirm', onPress: () => {
                      AsyncStorage.clear();
                      props.navigation.navigate('Login')
                    }},
                  ],
                  { cancelable: false }
                )  
              }>
                <Text style={{margin: 16,fontWeight: 'bold',color: colors.textColor}}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
        </View>
      ),
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle'
    })
  return Drawer;

}

export default withNavigation(Sesion);