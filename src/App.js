import React, { Component } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
//conceptual 'stack' navigation, 
//where each new screen is put on the top of the stack 
//and going back removes a screen from the top of the stack
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import TraineSearchScrn from './TraineSearchScrn';


class App extends Component {
    static navigationOptions = {
        title: 'Welcome to Marnie'
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', id_token: '' };
    }


    render() {
        const { navigate } = this.props.navigation;

        var navigateNext = function () {

            navigate('TraineSearchScrn');
        }


        var login = function (email, password) {

            axios({
                method: 'post',
                url: 'https://olek.eu.auth0.com/oauth/ro',
                data: {
                    client_id: 'WU0DxEKuQXDpgSJ8lGmLNr1Nux2ejl1P',
                    username: email,
                    password: password,
                    connection: 'Username-Password-Authentication',
                    grant_type: 'password',
                    scope: 'openid'
                }
            }).then(function (response) {
                navigateNext();
                Alert.alert('Login successfull', JSON.stringify(response));
                return JSON.stringify(response);
            }).catch(function (error) {
                Alert.alert('Login failed', JSON.stringify(error));
                console.log(error);
            });

        }



        // We have wrapped our App component into the StackNavigator. 
        // The StackNavigator exposes the navigation properties.




        return (
            <View style={styles.container}>
                <Text>Enter your e-mail</Text>
                <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                <Text>Enter your password</Text>
                <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password}></TextInput>

                <Button onPress={() => login(this.state.email, this.state.password)}
                    title='Login'
                />
            </View>
        )

    }

}



const Navigator = StackNavigator({
    Home: { screen: App },
    TraineSearchScrn: { screen: TraineSearchScrn }

})

const styles = {
    container: {
        padding: 5
    },
    text: {
        margin: 20,
        textAlign: 'center'
    }
}

export default Navigator;