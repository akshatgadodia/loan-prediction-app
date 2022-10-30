import { StyleSheet, Text, View, Button, ImageBackground} from 'react-native';

function Home({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/header-background.jpg')} style={styles.headerImage}>
      <View style={styles.container}>
        <Text style={styles.text}> Want to know will your loan get approved? </Text>
        <View  style={styles.button}>
          <Button onPress={() => navigation.navigate('Predict Loan')} 
                  title="Predict Approval" color="#14bf98"
                  accessibilityLabel="Predict your loan approval"/>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  headerImage: {
    width : "100%",
    height : "100%",
  },
  text:{
    fontWeight : "bold",
    fontSize : 40,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 40
  },
  button:{
    fontSize : 20,
    margin: 20,
    width:"70%",
  }
});

export default Home
