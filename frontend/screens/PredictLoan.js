import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Button, TextInput } from 'react-native';
import { CheckBox } from "@rneui/themed";
import axios from 'axios';
import ModalComponent from '../components/ModalComponent'
import LoadingModal from '../components/LoadingModal'

function PredictLoan() {
  const [isFetching, setIsFetching] = useState(false)
  const [gender, setGender] = useState("");
  const [martialStatus, setMartialStatus] = useState("");
  const [dependents, setDependents] = useState("");
  const [education, setEducation] = useState("");
  const [selfEmployed, setSelfEmployed] = useState("");
  const [app, setApp] = useState(10000);
  const [coapp, setCoapp] = useState(0);
  const [loanAmt, setLoanAmt] = useState(0);
  const [loanTerm, setLoanTerm] = useState(65);
  const [creditHistory, setCreditHistory] = useState("");
  const [propertyArea, setPropertyArea] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("")

  const predictLoan = async () => {
    setIsFetching(true)
    try{
      const bodyData = {
        "gender": gender,
        "married": martialStatus,
        "depend": dependents,
        "edu": education,
        "selfemp": selfEmployed,
        "app": app,
        "coapp": coapp,
        "loan": loanAmt,
        "loanterm": loanTerm,
        "credit": creditHistory,
        "prop": propertyArea
      }
      const response = await axios.post('https://loan-prediction-backend.herokuapp.com/api/predict-loan',bodyData)
      const data = await response.data
      if(data.data==="Y"){
        setModalText("Congratulations! Your loan has been approved")
      }
      else{
        setModalText("SORRY! Your loan has not been approved")
      }
    }
    catch(error){
      setModalText("Some Error Occurred! Please Check and Try Again.")
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
    setIsFetching(false)
    setModalVisible(true)
    setApp("")
    setCoapp("")
    setCreditHistory("")
    setDependents("")
    setEducation("")
    setGender("")
    setLoanAmt("")
    setLoanTerm("")
    setMartialStatus("")
    setSelfEmployed("")
    setPropertyArea("")
  }

  return (
    <SafeAreaView style={styles.container}>

      <LoadingModal isFetching={isFetching} setIsFetching={setIsFetching}/> 

      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalText={modalText}/>

      <Text style={styles.heading}>Please Fill in the details to get your chances of Loan Approval</Text>
      <ScrollView style={styles.insideContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="MALE" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(gender==="MALE") ? true : false} onPress={() => setGender((gender==="MALE") ? "" : "MALE")}
          />
          <CheckBox center title="FEMALE" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(gender==="FEMALE") ? true : false} onPress={() => setGender((gender==="FEMALE") ? "" : "FEMALE")}
          />
        </View>
        <Text style={styles.label}>Martial Status</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="YES" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(martialStatus==="YES") ? true : false} onPress={() => setMartialStatus((martialStatus==="YES") ? "" : "YES")}
          />
          <CheckBox center title="NO" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98'
                    checked={(martialStatus==="NO") ? true : false} onPress={() => setMartialStatus((martialStatus==="NO") ? "" : "NO")}
          />
        </View>
        <Text style={styles.label}>Dependents</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="0" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(dependents==="0") ? true : false} onPress={() => setDependents((dependents==="0") ? "" : "0")}
          />
          <CheckBox center title="1" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98'
                    checked={(dependents==="1") ? true : false} onPress={() => setDependents((dependents==="1") ? "" : "1")}
          />
          <CheckBox center title="2" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(dependents==="2") ? true : false} onPress={() => setDependents((dependents==="2") ? "" : "2")}
          />
          <CheckBox center title="3+" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98'
                    checked={(dependents==="3+") ? true : false} onPress={() => setDependents((dependents==="3+") ? "" : "3+")}
          />
        </View>
        <Text style={styles.label}>Education</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="Graduate" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98' 
                    checked={(education==="Graduate") ? true : false} onPress={() => setEducation((martialStatus==="Graduate") ? "" : "Graduate")}
          />
          <CheckBox center title="Not Graduate" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(education==="Not Graduate") ? true : false} onPress={() => setEducation((martialStatus==="Not Graduate") ? "" : "Not Graduate")}
          />
        </View>
        <Text style={styles.label}>Self Employed</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="YES" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(selfEmployed==="YES") ? true : false} onPress={() => setSelfEmployed((selfEmployed==="YES") ? "" : "YES")}
          />
          <CheckBox center title="NO" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(selfEmployed==="NO") ? true : false} onPress={() => setSelfEmployed((selfEmployed==="NO") ? "" : "NO")}
          />
        </View>
        <Text style={styles.label}>Applicant Income</Text>
        <View style={styles.textFieldContainer}>
          <TextInput style={{padding:10, color:"#000", width:"98%", height: 40}} placeholder="Enter value between 10000 & 8100000" 
                    value={app} onChangeText={(val)=>setApp(val)}
                    placeholderTextColor="#000" underlineColorAndroid="#000" keyboardType='number-pad'/>
        </View>

        <Text style={styles.label}>Co-Applicant Income</Text>
        <View style={styles.textFieldContainer}>
          <TextInput style={{padding:10, color:"#000", width:"98%",height: 40}} placeholder="Enter value between 0 & 4166700" 
                    value={coapp} onChangeText={(val)=>setCoapp(val)}
                    placeholderTextColor="#000" underlineColorAndroid="#000" keyboardType='number-pad'/>
        </View>

        <Text style={styles.label}>Loan Amount</Text>
        <View style={styles.textFieldContainer}>
          <TextInput style={{padding:10, color:"#000", width:"98%",height: 40}} placeholder="Enter value between 0 & 340900" 
                     value={loanAmt} onChangeText={(val)=>setLoanAmt(val)}
                    placeholderTextColor="#000" underlineColorAndroid="#000" keyboardType='number-pad'/>
        </View>

        <Text style={styles.label}>Loan Amount Term</Text>
        <View style={styles.textFieldContainer}>
          <TextInput style={{padding:10, color:"#000", width:"98%",height: 40}} placeholder="Enter value between 65 & 480" 
                    value={loanTerm} onChangeText={(val)=>setLoanTerm(val)}
                    placeholderTextColor="#000" underlineColorAndroid="#000" keyboardType='number-pad'/>
        </View>
        
        <Text style={styles.label}>Credit History</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="0" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(creditHistory==="0") ? true : false} onPress={() => setCreditHistory((creditHistory==="0") ? "" : "0")}
          />
          <CheckBox center title="1" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(creditHistory==="1") ? true : false} onPress={() => setCreditHistory((creditHistory==="1") ? "" : "1")}
          />
        </View>
        <Text style={styles.label}>Property Area</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox center title="Urban" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(propertyArea==="Urban") ? true : false} onPress={() => setPropertyArea((propertyArea==="Urban") ? "" : "Urban")}
          />
          <CheckBox center title="Rural" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checkedColor='#14bf98'
                    checked={(propertyArea==="Rural") ? true : false} onPress={() => setPropertyArea((propertyArea==="Rural") ? "" : "Rural")}
          />
          <CheckBox center title="Semiurban" checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checkedColor='#14bf98' 
                    checked={(propertyArea==="Semiurban") ? true : false} onPress={() => setPropertyArea((propertyArea==="Semiurban") ? "" : "Semiurban")}
          />
        </View>
        <View  style={styles.submitButton}>
          <Button onPress={predictLoan} 
                  title="Predict Approval" color="#14bf98"
                  accessibilityLabel="Predict your loan approval"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    backgroundColor: '#fff',
    width: "80%",
    marginBottom : 40
  },
  label: {
    fontSize:20,
    paddingTop : 20,
  },
  heading:{
    textAlign: 'center',
    fontSize: 25,
    margin: 40,
    lineHeight: 35,
    fontWeight : 'bold',
    color : "#14bf98"
  },
  checkboxContainer: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: "space-around",
    alignItems: "center"
  },
  textFieldContainer:{
    flex : 1,
    flexDirection: 'column',
    alignItems: "center",
    textAlign: "center",
  },
  submitButton:{
    fontSize : 20,
    margin: 20,
    
  }
});

export default PredictLoan