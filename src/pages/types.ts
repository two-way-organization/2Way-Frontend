import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CompanySetup: undefined;

  CompanyHome: NavigatorScreenParams<CompanyHomeTabParamList> | undefined;
  ApplicantHome: NavigatorScreenParams<ApplicantHomeTabParamList> | undefined;
};

export type CompanyHomeTabParamList = {
  Home: undefined;
  ApplicationRegister: undefined;
  ApplicationManagement: undefined;
  ApplicantManagement: undefined;
  Profile: undefined;
}

export type ApplicantHomeTabParamList = {
  Home: undefined;
  Information: undefined;
  Status: undefined;
  Favorite: undefined;
  Profile: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
