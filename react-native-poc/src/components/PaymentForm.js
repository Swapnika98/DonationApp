import React, {useState,useEffect, useReducer} from 'react'
import { View,Text, StyleSheet,Button,TextInput,TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

export default function PaymentForm({onSubmit,initialValues,paymentType,payeeName,submitBtnText, registration=false,emails=[]}) {    
    const paymentDetails = useSelector((state) => state.paymentDetails);

    const initialName = paymentDetails.name!==""?paymentDetails.name: (payeeName? payeeName:initialValues.name)
    const initialaccno = paymentDetails.accno!==""?paymentDetails.accno: (initialValues.accno)
    const initialifsc = paymentDetails.ifsc!==""?paymentDetails.ifsc: (initialValues.ifsc)
    const initialamount = paymentDetails.amount!==""?paymentDetails.amount: (initialValues.amount)
    const initialemail = paymentDetails.email!==""?paymentDetails.email: (initialValues.email)

    const [name,setname] = useState(initialName)
    const [accno, setaccno] = useState(initialaccno);
    const [ifsc, setifsc] = useState(initialifsc);
    const [email, setemail] = useState(initialemail);
    const [amount, setamount] = useState(initialamount);

    const [isSubmitted,setisSubmitted] = useState(false);

    const [nameIsValid,setNameIsValid] = useState(false)
    const [emailIsValid,setEmailIsValid] = useState(false);
    const [accIsValid,setAccIsValid] = useState(false);
    const [amountIsValid,setAmountIsValid] = useState(false);
    const [ifscIsValid,setIfscIsValid] = useState(false);

    const [emailExists, setEmailExists] = useState(false);

    const memberships = [
        {itemName : "standard"},
        {itemName : "premium"},
    ]
    const [selectedMembershipType, setselectedMembershipType] = useState(memberships[0].itemName)

    useEffect(() => {
        console.log(email)
        isSubmitted?validateEmail(email):''
        
    }, [email])

    const checkDbEmails = (text) => {
        console.log(emails);
        console.log(text);
        if(emails.includes(text)) return false;
        setEmailExists(false);
        setEmailIsValid(true)
        return true;
    }

    const emailAlreadyExists = () => {
        console.log("emailAlreadyExists"); setEmailIsValid(false);setEmailExists(true)
    }
    
    const validateEmail = (text) => {
        console.log("val",emailIsValid);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("if")
            setEmailIsValid(false)
            return false;
        }
        else {
            console.log("else");
            let isNew = checkDbEmails(email);
            console.log(isNew)
            isNew? setEmailIsValid(true): emailAlreadyExists();
        }
      }
    const validateAccno = (text) => {
        console.log(text);
        const reg = /^(\d{10}|\d{12})$/;
        if (reg.test(text) === true) {
            setAccIsValid(true);
        }
        else {
            setAmountIsValid(false);
            return false;
        }
    }
    const validateIFSC = (text) => {
        console.log(text);
        const reg = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (reg.test(text) === true) {
            setIfscIsValid(true);
        }
        else {
            setIfscIsValid(false);
            return false;
        }
    }
    const validateAmt = (text) => {
        console.log(text);
        const reg = /^[0-9]*$/;
        if (reg.test(text) === true && +text>=100) {
            setAmountIsValid(true);
        }
        else {
            setAmountIsValid(false);
            return false;
        }
    }
    const validateName = (text) => {
        console.log(text);
        const reg = /^[a-zA-Z]+$/;
        if (reg.test(text) === true) {
            setNameIsValid(true);
        }
        else {
            setNameIsValid(false);
            return false;
        }
    }

    const regFormSubmit = () => {
        setisSubmitted(true);
        validateEmail(email);
        validateAccno(accno);
        validateIFSC(ifsc);
        validateName(name);
        console.log(emailIsValid);
        if(!(nameIsValid && emailIsValid && accIsValid && ifscIsValid)) return;
        onSubmit(name,accno,ifsc,email,selectedMembershipType);
    }

    const amtFormSubmit = () => {
        setisSubmitted(true);
        validateAmt(amount);
        if(!(amountIsValid)) return;
        onSubmit(amount);
    }

    let regFormSubmitted = isSubmitted && registration;
    console.log("emailExists",emailExists);

    return (
    <View>
        <Text style={styles.label}>Full Name<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
        <TextInput style={[styles.input,regFormSubmitted?(nameIsValid?'':styles.inputFailure):'']} value={name} onChangeText={text=>{setname(text);isSubmitted?validateName(text):''}}/>
        {(regFormSubmitted && !nameIsValid) && <Text style={styles.inValidMsg}>Please enter a valid name</Text>}

        <Text style={styles.label}>Account Number<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
        <TextInput style={[styles.input,regFormSubmitted?(accIsValid?'':styles.inputFailure):'']} value={accno} onChangeText={text=>{setaccno(text);isSubmitted?validateAccno(text):''}}/>
        {(regFormSubmitted && !accIsValid) && <Text style={styles.inValidMsg}>Please enter a valid Account Number</Text>}

        <Text style={styles.label}>IFSC Code<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
        <TextInput style={[styles.input,regFormSubmitted?(ifscIsValid?'':styles.inputFailure):'']} value={ifsc} onChangeText={text=>{setifsc(text);isSubmitted?validateIFSC(text):''}}/>
        {(regFormSubmitted && !ifscIsValid) && <Text style={styles.inValidMsg}>Please enter a valid IFSC Code</Text>}

        {registration ? (
            <>
                <Text style={styles.label}>Email<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
                <TextInput style={[styles.input,(isSubmitted)?(emailIsValid?'':styles.inputFailure):'']} value={email} onChangeText={text=>{setemail(text);}}/>
                {((isSubmitted) && !emailIsValid && !emailExists) && <Text style={styles.inValidMsg}>Please enter a valid email</Text>}
                {((isSubmitted) && emailExists) && <Text style={styles.inValidMsg}>The email you entered is already taken. Please try with another email</Text>}

                <Text style={styles.label}>Membership Type</Text>
                <Picker
                    mode="dropdown"
                    style={styles.pickerStyle}
                    selectedValue={selectedMembershipType}
                    onValueChange={(itemValue)=>setselectedMembershipType(itemValue)}
                    >
                    {memberships.map((item, index) => (
                        <Picker.Item key={index}
                        color="#0087F0"
                        label={item.itemName}
                        value={item.itemName}
                        index={index}
                        />
                        ))}
                </Picker>
            </>
        ) : (
            <>
                <Text style={styles.label}>Amount<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
                <TextInput style={[styles.input,isSubmitted?(amountIsValid?'':styles.inputFailure):'']} value={amount} onChangeText={text=>{setamount(text);isSubmitted?validateAmt(text):''}}/>
                {(isSubmitted && !amountIsValid) && <Text style={styles.inValidMsg}>Please enter an amount more than 100</Text>}

                <Text style={styles.label}>Payment Type<Text style={styles.required}>&nbsp;*&nbsp;</Text></Text>
                <TextInput style={styles.input} value={paymentType} disabled/>
            </>
        )}
        <TouchableOpacity onPress={()=>registration?regFormSubmit():amtFormSubmit()}><Text style={styles.savebtn}>{submitBtnText}</Text></TouchableOpacity>
    </View>
    )
}

PaymentForm.defaultProps = {
    initialValues: {
        name:'',
        accno:'',
        ifsc: '',
        email:'',
        amount: ''
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5
    },
    inputFailure: {
        borderWidth: 3,
        borderColor: 'red',
    },
    label: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 5,
        color: 'blue',
        fontWeight: "500",
    },
    savebtn: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: "500",
        borderRadius: 20,
        textAlign: 'center',
        marginTop: 20
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "sans-serif",
        marginTop: 10,
    },
    required: {
        color: 'red'
    },
    inValidMsg: {
        fontSize: 12,
        color: 'red',
    }
})