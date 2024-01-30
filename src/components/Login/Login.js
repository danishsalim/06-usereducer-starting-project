import React, { useState, useEffect ,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) =>{
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.includes('@'),}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value,isValid:state.value.includes('@'),}
  }
  
  return {value:'',isValid:false,}
}

const passwordReducer = (state,action) =>{
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.length>=6,}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value,isValid:state.value>=6,}
  }
  
  return {value:'',isValid:false,}
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null})
  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'',isValid:null})
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input id="email" type="email" label="E-Mail" isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
      <Input id="password" type="password" label="Password" isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
