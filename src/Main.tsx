import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CompanySetupPage } from './pages/company/SetupPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './pages/types';
import { CompanyHomePage } from './pages/company/HomePage';
import { ApplicantHomePage } from './pages/applicant/HomePage';
import { ApplicantSetupPage } from './pages/applicant/SetupPage';
import { ApplyFragment } from './pages/applicant/main/fragment/ApplyFragment';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Main = () => {

  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name={'Login'}
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Register'}
        component={RegisterPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CompanySetup'}
        component={CompanySetupPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CompanyHome'}
        component={CompanyHomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplicantSetup'}
        component={ApplicantSetupPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplicantHome'}
        component={ApplicantHomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Apply'}
        component={ApplyFragment}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
