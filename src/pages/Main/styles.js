import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

export const Container = styled.View`
    flex: 1;
    padding: 30px;
    background: #fff;
`;

export const Form = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    height: 40px;
    background: #eee;
    border-radius: 4px;
    padding: 0 15px;
    border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background: #7159c1;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 12px;
    opacity: ${(props) => (props.loading ? 0.7 : 1.0)};
`;

export const List = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const User = styled.View`
    align-items: center;
    margin: 0 20px 30px;
`;
export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background: #eee;
`;
export const Name = styled.Text`
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
`;
export const Bio = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 13px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: center;
`;
export const ProfileButtonAdd = styled(RectButton)`
    margin: 10px 5px 0 5px;
    align-self: stretch;
    border-radius: 4px;
    background: #7159c1;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 85%;
`;
export const ProfileButtonDelete = styled(RectButton)`
    margin: 10px 5px 0 5px;
    align-self: stretch;
    border-radius: 4px;
    background: red;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 15%;
`;
export const ProfileButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
`;
export const Buttons = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
