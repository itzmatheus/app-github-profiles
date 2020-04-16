import 'react-native-get-random-values';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class RepositoryWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('repository').name,
        headerTitleAlign: 'center',
    });

    render() {
        const { navigation } = this.props;
        const repository = navigation.getParam('repository');

        return (
            <WebView
                source={{ uri: repository.html_url }}
                style={{ flex: 1 }}
            />
        );
    }
}

RepositoryWebView.propTypes = {
    navigation: PropTypes.shape({ navigation: PropTypes.func }).isRequired,
};
