import { Platform, View } from 'react-native';
import { colors } from '../../../constants/theme';
import { Card, TextInput, TouchableRipple, Text } from 'react-native-paper';
import { m8, mx16, my8, p16, p8, px16, px8, py16 } from '../../../common/style';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomApplications, fetchRecentApplications } from '../../../api/application';
import { useAuthStore } from '../../../stores/auth';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Pagination } from '../../../common/Pagination';
import { useMemo } from 'react';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const VIEW_WIDTH = 320;

type SurviceCardProps = {
  title: string;
  children: string;
};
type SimpleCardProps = {
  title: string;
  subtitle: string;
  endDate: Date;
  level: string;
  location: string;
}
type MainCardProps = SimpleCardProps & {
  favorite?: boolean;
  onFavorite?: (favorite: boolean) => void;
}
const MainCard = ({
                    title,
                    subtitle,
                    endDate,
                    level,
                    location,

                    favorite = false,
                    onFavorite,
                  }: MainCardProps) => (
  <Card style={[p16, mx16, my8, { width: VIEW_WIDTH - 32 }]}>
    <Card.Title
      title={title}
      subtitle={subtitle}
      titleVariant={'titleLarge'}
      titleStyle={{ fontWeight: 'bold' }}
      subtitleVariant={'titleSmall'}
      subtitleStyle={{ fontWeight: 'bold' }}
    />
    <Card.Content>
      <Text style={{ color: colors.gray }}>
        ~ {endDate.toDateString()} | {level} | {location}
      </Text>
    </Card.Content>
    <Card.Actions>
      <TouchableRipple onPress={() => onFavorite?.(!favorite)}>
        <Icons name="favorite" size={24} color={favorite ? colors.red : colors.gray}/>
      </TouchableRipple>
    </Card.Actions>
  </Card>
);
const SimpleCard = ({
                      title,
                      subtitle,
                      endDate,
                      level,
                      location,
                    }: SimpleCardProps) => (
  <Card style={[p16, my8]}>
    <Card.Title
      title={title}
      subtitle={subtitle}
      titleVariant={'titleLarge'}
      titleStyle={{ fontWeight: 'bold' }}
      subtitleVariant={'titleSmall'}
      subtitleStyle={{ fontWeight: 'bold' }}
    />
    <Card.Content>
      <Text style={{ color: colors.gray }}>
        ~ {endDate.toDateString()} | {level} | {location}
      </Text>
    </Card.Content>
  </Card>
);

const SurviceCard = ({ title, children }: SurviceCardProps) => (
  <Card style={[p8, m8, { width: 180, height: 180 }]}>
    <Card.Title
      title={title}
      titleVariant={'titleMedium'}
      titleStyle={{ fontWeight: 'bold', color: colors.primary }}
    />
    <Card.Content>
      <Text variant={'bodyMedium'}>
        {children}
      </Text>
    </Card.Content>
  </Card>
);

export const ApplicantHomeFragment = () => {
  const token = useAuthStore((it) => it.token);

  const { data: randomData } = useQuery({
    queryKey: ['applications/random'],
    queryFn: async () => token ? await fetchRandomApplications(token) : { jobs: [] },
  });
  const { data: recentData } = useQuery({
    queryKey: ['applications/recent'],
    queryFn: async () => token ? await fetchRecentApplications(token) : { jobs: [] },
  });
  const randomJobs = useMemo(() => randomData instanceof Error ? [] : randomData?.jobs ?? [], [randomData]);
  const recentJobs = useMemo(() => recentData instanceof Error ? [] : recentData?.jobs ?? [], [recentData]);

  const offset = useSharedValue(0);
  const scroll = useSharedValue(0);

  const onCarouselScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const { x } = event.contentOffset;
      offset.value = Math.max(x + 32, 0) / VIEW_WIDTH;
    },
  }, [VIEW_WIDTH]);
  const onPageScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const { y } = event.contentOffset;
      scroll.value = y;
    },
  }, []);

  const searchBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: Math.max(0, scroll.value),
      },
    ],
  }));

  return (
    <AnimatedScrollView scrollEventThrottle={16} onScroll={onPageScroll} bounces={false}>
      <Animated.View
        style={[p16, searchBarStyle, { top: 0, backgroundColor: colors.primary, paddingTop: 0, zIndex: 50 }]}>
        <TextInput
          mode={'outlined'}
          theme={{
            colors: {
              primary: colors.white,
              onSurface: colors.white,
              background: colors.primary,
              outline: colors.white,
            },
          }}
          right={<TextInput.Icon icon={'magnify'} color={colors.white}/>}
        />
      </Animated.View>
      <View style={[py16, { position: 'relative' }]}>
        <View style={{ position: 'absolute', backgroundColor: colors.primary, width: '100%', height: 64 }}/>
        <AnimatedScrollView
          horizontal
          pagingEnabled
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          snapToInterval={VIEW_WIDTH}
          decelerationRate={Platform.OS === 'ios' ? 0 : 'fast'}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onCarouselScroll}
        >
          {randomJobs.map((it) => (
            <MainCard
              key={it.jobId}
              title={it.title}
              subtitle={it.companyName}
              endDate={new Date(it.endDate)}
              level={it.experienceLevel}
              location={it.location}
            />
          ))}
        </AnimatedScrollView>
        <View style={py16}>
          <Pagination
            length={randomJobs.length}
            animatedIndex={offset}
            size={12}
            activeColor={colors.primary}
            deactiveColor={colors.gray}
          />
        </View>
        <View style={[px16]}>
          <Text variant={'titleMedium'}>
            추천 서비스
          </Text>
        </View>
        <ScrollView horizontal contentContainerStyle={px8} showsHorizontalScrollIndicator={false}>
          <SurviceCard title={'📜자기소개서 요약'}>
            자기소개서를 요약받아보세요~
            AI가 요약한 자기 소개서를 바로 확인할 수 있습니다.
          </SurviceCard>
          <SurviceCard title={'📜자기소개서 요약'}>
            자신의 코딩 역량을 객관적으로 파악해보세요~
            GitHub와 백준 계정을 자동으로 분석하여 코딩 역량을 계산합니다.
          </SurviceCard>
          <SurviceCard title={'📜이스터에그'}>
            넣을게 없어서 넣었습니다
            그래도 재밌으면 됐죠?
          </SurviceCard>
        </ScrollView>
        <View style={p16}>
          <Text variant={'titleMedium'}>
            채용관
          </Text>
          {recentJobs.map((it) => (
            <SimpleCard
              key={it.jobId}
              title={it.title}
              subtitle={it.companyName}
              endDate={new Date(it.endDate)}
              level={it.experienceLevel}
              location={it.location}
            />
          ))}
        </View>

      </View>
    </AnimatedScrollView>
  );
};
