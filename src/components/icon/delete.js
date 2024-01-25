import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteIcon = ({onClick}={})=>{
    return <View onPress={onClick}> <Icon name="delete" size={30} color="red" /></View>
}
export default DeleteIcon;