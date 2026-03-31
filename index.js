import { AppRegistry, StatusBar, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { commonColors } from './src/utility/appColors';

const Root = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={commonColors.black}
      />

      <Provider store={store}>
        <App />
      </Provider>
    </View>
  );
};

AppRegistry.registerComponent(appName, () => Root);
