import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import api from '../../services/api';

import {
    Header,
    Container,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
    Loading,
} from './styles';

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
    });

    constructor(props) {
        super(props);
        this.state = {
            stars: [],
            loading: false,
            nextPage: '',
            lastPage: '',
            refreshing: false,
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = async () => {
        const { navigation } = this.props;
        const user = navigation.getParam('user');

        this.setState({ refreshing: true });

        const response = await api.get(`/users/${user.login}/starred?page=1`);

        const nextPageUrl = this.getLinkUrlGitHub(response.headers.link, 0);
        const lastPageUrl = this.getLinkUrlGitHub(response.headers.link, 1);

        this.setState({
            stars: response.data,
            nextPage: nextPageUrl,
            lastPage: lastPageUrl,
            refreshing: false,
        });
    };

    getLinkUrlGitHub = (link, index) => {
        let url = '';

        if (link) {
            [url] = link
                .split(',')
                [index].replace('<', '')
                .replace(' ', '')
                .split('>');
        }

        return url;
    };

    handleNavigate = (repository) => {
        const { navigation } = this.props;

        navigation.navigate('Repository', { repository });
    };

    async loadPage() {
        const { stars, nextPage, lastPage } = this.state;

        if (nextPage === lastPage) return;

        this.setState({ loading: true });

        const response = await api.get(nextPage);
        const { data } = response;

        const nextPageUrl = this.getLinkUrlGitHub(response.headers.link, 1);
        const lastPageUrl = this.getLinkUrlGitHub(response.headers.link, 2);

        this.setState({
            nextPage: nextPageUrl,
            lastPage: lastPageUrl,
            loading: false,
            stars: [...stars, ...data],
        });
    }

    render() {
        const { navigation } = this.props;
        const { stars, loading, refreshing } = this.state;
        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                <Stars
                    data={stars}
                    keyExtractor={(star) => String(star.id)}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => this.loadPage()}
                    onRefresh={this.refreshList}
                    refreshing={refreshing}
                    ListFooterComponent={loading && <Loading />}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar
                                source={{ uri: item.owner.avatar_url }}
                            />
                            <TouchableOpacity
                                onPress={() => this.handleNavigate(item)}
                                style={{ flet: 1 }}
                            >
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </TouchableOpacity>
                        </Starred>
                    )}
                />
            </Container>
        );
    }
}

User.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};
