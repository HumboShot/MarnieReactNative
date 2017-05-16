import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';

export default class TraineSearchScrn extends Component {
    static navigationOptions = {
        title: 'Search Train'
    };

    constructor(props) {
        super(props);
        this.state = { from: 'Aalborg', to: 'Randers', datetime: '2017-05-10 10:03' };
    }

    render() {
        const { navigate } = this.props.navigation;

        var searchJourney = function (from, to, datetime) {
            axios.get('http://marnie-001-site1.atempurl.com/api/Route', {
                params: {
                    from: from,
                    to: to,
                    startTime: datetime
                }
            }).then(function (response) {
                // navigateNext();
                console.log(response);
                Alert.alert(JSON.stringify(response));
                // return JSON.stringify(response);
            }).catch(function (error) {
                Alert.alert('Failed', JSON.stringify(error));
                console.log(error);
            });

        }

        return (
            <View>
                <View style={styles.button} >
                    <Text>From</Text>
                    <TextInput onChangeText={(from) => this.setState({ from })} value={this.state.from} />
                </View>

                <View style={styles.button}>
                    <Text>To</Text>
                    <TextInput onChangeText={(to) => this.setState({ to })} value={this.state.to}></TextInput>
                </View>

                <View style={styles.button}>
                    <Text>Travel datetime</Text>
                    <TextInput onChangeText={(datetime) => this.setState({ datetime })} value={this.state.datetime}></TextInput>
                </View>

                <View style={styles.button} >

                    <Button onPress={() => searchJourney(this.state.from, this.state.to, this.state.datetime)} title='Search journey' />

                </View>
            </View>



        )
    }
}




const styles = {
    container: {
        padding: 5
    },
    text: {
        margin: 20,
        textAlign: 'center'
    },

    button: {
        margin: 5,
        padding: 5
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }

}