import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicantSetupTabParamList } from '../types';
import { ApplicantSetupDetailFragment } from './setup/DetailFragment';
import { ApplicantSetupStartFragment } from './setup/StartFragment';
import { ApplicantSetupExperienceFragment } from './setup/ExperienceFragment';

const Stack = createNativeStackNavigator<ApplicantSetupTabParamList>();

export const ApplicantSetupPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Start'}
        component={ApplicantSetupStartFragment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Experience'}
        component={ApplicantSetupExperienceFragment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Detail'}
        component={ApplicantSetupDetailFragment}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
