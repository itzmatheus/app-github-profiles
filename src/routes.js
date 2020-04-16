import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/WebViewRepository';

const Routes = createAppContainer(
    createStackNavigator(
        { Main, User, Repository },
        {
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#7159c1',
                },
                headerTintColor: '#FFF',
            },
        }
    )
);

export default Routes;
