import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButtonAdd,
    ProfileButtonDelete,
    ProfileButtonText,
    Buttons,
} from './styles';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: '',
            users: [],
            loading: false,
        };
    }

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');
        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { users } = this.state;

        if (prevState.users !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    Alert = (title, msg) =>
        Alert.alert(
            title,
            msg,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                { text: 'OK' },
            ],
            { cancelable: false }
        );

    handleAddUser = async () => {
        const { users, newUser } = this.state;

        this.setState({ loading: true });

        await api
            .get(`/users/${newUser}`)
            .then((response) => {
                const data = {
                    name: response.data.name,
                    login: response.data.login,
                    bio: response.data.bio,
                    avatar: response.data.avatar_url,
                };

                this.setState({
                    users: [...users, data],
                    newUser: '',
                });
            })
            .catch(() => {
                this.Alert(
                    'Usuário Inexistente',
                    `Não foi possível encontrar o usuário ${newUser}.`
                );
            });

        this.setState({ loading: false });
        Keyboard.dismiss();
    };

    renderItem = ({ item }) => (
        <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <Buttons>
                <ProfileButtonAdd onPress={() => this.handleNavigate(item)}>
                    <ProfileButtonText>Ver perfil</ProfileButtonText>
                </ProfileButtonAdd>
                <ProfileButtonDelete onPress={() => this.handleDelete(item)}>
                    <Icon name="delete" color="#FFF" size={20} />
                </ProfileButtonDelete>
            </Buttons>
        </User>
    );

    handleNavigate = (user) => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    };

    handleDelete = (user) => {
        const { users } = this.state;
        this.setState({ users: users.filter((u) => u !== user) });
    };

    render() {
        const { users, newUser, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={(text) =>
                            this.setState({ newUser: text })
                        }
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />

                    <SubmitButton
                        loading={loading}
                        onPress={this.handleAddUser}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )}
                    </SubmitButton>
                </Form>
                <List
                    data={users}
                    keyExtractor={(user) => user.login}
                    renderItem={this.renderItem}
                />
            </Container>
        );
    }
}

Main.navigationOptions = {
    title: 'Usuários',
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
