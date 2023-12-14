import { NavigatorScreenParams } from '@react-navigation/native';
import { ApplicationStatus, Job } from '../schemas/application';
import { Question } from '../schemas/question';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CompanySetup: NavigatorScreenParams<CompanySetupTabParamList> | undefined;
  ApplicantSetup: NavigatorScreenParams<ApplicantSetupTabParamList> | undefined;

  CompanyHome: NavigatorScreenParams<CompanyHomeTabParamList> | undefined;
  ApplicantHome: NavigatorScreenParams<ApplicantHomeTabParamList> | undefined;

  Apply: NavigatorScreenParams<ApplyStackParamList>;
};

export type CompanySetupTabParamList = {
  Start: undefined;
  Experience: undefined;
  Detail: undefined;
};

export type CompanyHomeTabParamList = {
  Home: undefined;
  ApplicationRegister: undefined;
  ApplicationManagement: undefined;
  ApplicantManagement: undefined;
  Profile: undefined;
}



export type ApplicantSetupTabParamList = {
  Start: undefined;
  Experience: undefined;
  Detail: undefined;
};

export type ApplicantHomeTabParamList = {
  Home: undefined;
  Information: NavigatorScreenParams<ApplicantInformationStackParamList> | undefined;
  Status: NavigatorScreenParams<ApplicantStatusStackParamList> | undefined;
  Favorite: NavigatorScreenParams<ApplicantFavoriteStackParamList> | undefined;
  Profile: undefined;
}

export type ApplicantStatusStackParamList = {
  Default: undefined;
  Detail: {
    status: ApplicationStatus;
  };
};
export type ApplicantInformationStackParamList = {
  Default: undefined;
  Detail: {
    job: Job;
  };
};
export type ApplicantFavoriteStackParamList = {
  Default: undefined;
  Detail: {
    job: Job;
  };
};

export type ApplyStackParamList = {
  Default: {
    job: Job;

  };
  Analyze: {
    text: string;
    applicationId: number;
    job: Job;
    question: string;
    index: number;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
