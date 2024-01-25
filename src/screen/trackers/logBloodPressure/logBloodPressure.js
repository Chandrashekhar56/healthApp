import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from '../../../components/icon';
import { verticalScale } from '../../../lib/utils';
import { TouchableOpacity } from 'react-native';
import palette from '../../../theme/palette';
import Typography from '../../../components/Typography';

const LogBloodPressure = () => {
    const lists = [
        {
            name: 'Log Blood pressure',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />
        },
        {
            name: 'Log Blood sugar',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />,
        },
        {
            name: 'Log Food',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />,
        },
        {
            name: 'Log Fruits & veggies',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />,
        },
        {
            name: 'Log Labs',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />,
        },
        {
            name: 'Log Steps',
            onPress: () => { },
            icon: <Icon name="plus-circle" style={{ fontSize: 80, color: palette.background.main }} />,
        },
    ];

    return (
        <ScrollView>
            <View>
                {lists.map((item, index) => (
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: verticalScale(10),
                        flexDirection: 'row',
                        height: 100,
                        borderWidth: .5,
                        borderColor: palette.background.main,
                        borderRadius: 8,
                    }} key={index}>
                        <Typography style={{ marginLeft: verticalScale(10) }} variant='titleMedium'>
                            {item?.name}
                        </Typography>
                        <TouchableOpacity>
                            <View style={{ marginRight: verticalScale(10) }}>
                                {item?.icon}
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default LogBloodPressure;
