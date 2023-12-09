import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CompanyHomeFragment = () => {
  return (
    <ScrollView
      contentContainerStyle={{
      }}
    >
      <Text>
        오늘 마감 예정인 공고가 {0}개 있습니다.
      </Text>
    </ScrollView>
  );
};
