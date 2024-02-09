import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import LoadingButton from '../../components/CustomButton/loadingButton';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import { verticalScale } from '../../lib/utils';
import palette from '../../theme/palette';
import { TouchableRipple } from 'react-native-paper';

const lists = [
  {
    id: 1,
    Title: 'Reduce stress',
    Icon: require("../../assets/images/emoji/ReduceStress/ReduceStress.png"),
    Description: 'ReduceStress.png',
  },

  {
    id:2,
    Title: 'Falling sleep',
    Icon: require("../../assets/images/emoji/FallingSleep/FallingSleep.png"),
    Description: 'FallingSleep.png',
  },

  {
    id:3,
    Title: 'Lose weight',
    Icon: require("../../assets/images/emoji/LoseWeight/LoseWeight.png"),
    Description: 'LoseWeight.png',
  },

  {
    id:4,
    Title: 'Build muscle',
    Icon: require("../../assets/images/emoji/BuildMuscle/BuildMuscle.png"),
    Description: 'BuildMuscle.png',
  },

  {
    id:5,
    Title: 'Stat healthy',
    Icon: require("../../assets/images/emoji/StatHealthy/StatHealthy.png"),
    Description: 'StatHealthy.png',
  }
];

export default function PreQuestionnaireItems() {
  return (
    <ScrollView>
      <View style={{
        flex: 1,
        ...layoutPadding,
      }}>
        <View style={{
          marginTop: verticalScale(51),
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Typography style={{
            textAlign: 'center',
          }}       
          >What would you like to focus?</Typography>
        </View>

        <View>
          {lists.map((item, index) => (
            <View
              key={item.id}
              style={{
                marginTop: verticalScale(21),
                backgroundColor: palette.background.paper,
                borderRadius: verticalScale(20), 
                overflow: 'hidden',
              }}>
              <TouchableRipple onPress={() => { }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      marginLeft: verticalScale(23.65),
                      marginTop: verticalScale(25),
                      marginBottom: verticalScale(25),
                    }}>
                    <Image source={item.Icon} alt={item.Description} />
                  </View>
                  <View
                    style={{
                      marginLeft: verticalScale(25.35),
                      marginTop: verticalScale(25),
                      marginBottom: verticalScale(25),
                    }}>
                    <Typography>{item.Title}</Typography>
                  </View>
                </View>
              </TouchableRipple>
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: verticalScale(47),
          }}>
          <LoadingButton
            label="Continue"
            onPress={() => { }}
          />
        </View>
        <View
          style={{
            marginTop: verticalScale(25),
            marginBottom: verticalScale(46),
          }}>
          <Typography
            style={{
              textAlign: 'center'
            }}>Skip for now</Typography>
        </View>
      </View>
    </ScrollView>
  );
}