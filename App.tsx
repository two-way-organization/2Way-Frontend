import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { DEFAULT_THEME } from './src/constants/theme';
import { Main } from './src/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { flex1 } from './src/common/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PaperProvider theme={DEFAULT_THEME}>
          <GestureHandlerRootView style={flex1}>
            <Main/>
          </GestureHandlerRootView>
        </PaperProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
