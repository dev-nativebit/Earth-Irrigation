/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {theme} from '@/style';
import {
  ForceUpdateFullScreen,
  FullScreenProgress,
  NoInternetFullScreen,
  refFullScreenProgress,
} from '@/component';
import {AppNavigator} from '@/navigation/AppNavigation';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {actions, store} from '@/redux/root.store';
import {initHttpClient} from '@/core';
import {BASE_URL} from '@/api/EndPoint';
import {DeviceHelper} from "@/helper";

function App(): React.JSX.Element {

  useEffect(() => {
    initHttpClient(BASE_URL);
    setTimeout(async ()=>{
      await actions.forceUpdateThunkCallActions(DeviceHelper.isIos() ? 'IOS' : 'ANDROID')
    },100)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NoInternetFullScreen onTryAgain={() => {}}>
          <AppNavigator onRouteChange={() => {}} />
          <FlashMessage />
          <FullScreenProgress ref={refFullScreenProgress} />
          <ForceUpdateFullScreen />
        </NoInternetFullScreen>
      </Provider>
    </ThemeProvider>
  );
}


export default App;
