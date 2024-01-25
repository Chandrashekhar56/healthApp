import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CloseIcon = ({onClick}={})=>{
    return <View onPress={onClick}> <Icon name="close" size={30} color="red" /></View>
}
export default CloseIcon;