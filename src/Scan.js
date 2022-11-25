'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Contacts from 'react-native-contacts';

export default class App extends Component {
  newPerson = {
    displayName: '',
    company: ' ',
    emailAddresses: [
      {
        label: 'work',
        email: ' ',
      },
    ],
    title: ' ',
    urlAddresses: [
      {
        label: 'home',
        url: ' ',
      },
    ],
    phoneNumbers: [
      {
        label: 'mobile',
        number: ' ',
      },
      {
        label: 'work',
        number: ' ',
      },
    ],
    /* postalAddresses: [
      {
        street: '123 Street',
        city: 'City',
        state: 'CAS',
        region: 'CAS',
        postCode: '700011',
        country: 'US',
        label: 'work',
      },
    ], */
    //birthday: {year: 1998, month: 1, day: 1},
  };
  /* onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  }; */
  onSuccess = e => {
    const field = e.data.split('\n');
    console.log(field);
    const length = field.length;
    var i;
    var vcard = {};
    for (i = 0; i < length; i++) {
      var temp = field[i].split(':');
      vcard[temp[0]] = temp[1];
    }
    //console.log(temp);
    //console.log(vcard);
    if (vcard.ORG) {
      this.newPerson.company = vcard.ORG;
    }
    if (vcard.FN) {
      this.newPerson.displayName = vcard.FN;
    }
    if (vcard.TITLE) {
      this.newPerson.title = vcard.TITLE;
    }
    if (vcard['EMAIL;TYPE=internet,home']) {
      this.newPerson.emailAddresses[0].email =
        vcard['EMAIL;TYPE=internet,home'];
    }
    if (vcard['TEL;TYPE=home']) {
      this.newPerson.phoneNumbers[0].number = vcard['TEL;TYPE=home'];
    }
    if (vcard['TEL;TYPE=work']) {
      this.newPerson.phoneNumbers[1].number = vcard['TEL;TYPE=work'];
    }
    if (vcard['URL;TYPE=home']) {
      this.newPerson.urlAddresses[0].url = vcard['URL;TYPE=home'];
    }
    //console.catch(err => console.error('An error occured', err));
    if (vcard.BEGIN) {
      Contacts.openContactForm(this.newPerson, (err, contact) => {
        if (err) {
          throw err;
        }
        // contact has been saved
      });
    } else {
      ToastAndroid.show(
        'QR Code not a VCard',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  /* onSuccess = e => {
    Contacts.openContactForm(this.newPerson, (err, contact) => {
      if (err) {
        throw err;
      }
      // contact has been saved
    });
  }; */

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#212121" />
        <QRCodeScanner
          onRead={this.onSuccess}
          reactivate={true}
          cameraStyle={styles.camStyle}
          // flashMode={QRCodeScanner.Constants.FlashMode.torch}

          /* topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          } */
          /* bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          } */
        />
      </View>
    );
  }
}
console.disableYellowBox = true;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camStyle: {
    height: Dimensions.get('window').height,
  },
});
