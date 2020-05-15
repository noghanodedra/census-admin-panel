/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';

const regExpIntOnly = new RegExp(/^[0-9\b]+$/);

const useForm = (initModel:Array<any>, submitCallback: Function) => {
  const [inputs, setInputs] = useState(initModel);

  const handleChange = (e:any) => {
    console.log('inputs', inputs);
    e.persist();
    inputs.forEach((i: any) => {
      if (i.id === e.target.id || i.id === e.target.name) {
        i.error = false;
        i.helperText = '';
        if (i.InputProps && i.type && i.type === 'number') {
          const { min, max } = i.InputProps.inputProps;
          const val = e.target.value;
          if (regExpIntOnly.test(val)) {
            // i.value = Math.max(Number(min), Math.min(Number(max), Number(val)));
            const nVal = Number(val);
            if (nVal >= Number(min) && nVal <= Number(max)) i.value = val;
          } else if (val === '') {
            i.value = '';
          }
        } else {
          // eslint-disable-next-line no-param-reassign
          i.value = i.type === 'checkbox' ? e.target.checked : e.target.value;
        }
        parseInput(i);
        validateInput(i);
      }
    });
    setInputs([...inputs]);
  };

  const handleSubmit = (e:any) => {
    e && e.preventDefault();
    inputs.forEach((i) => validateInput(i));
    inputs.some((i) => i.error) ? setInputs([...inputs]) : submitCallback(inputs);
  };


  const parseInput = (input:any) => (input.value = input.parseFunc ? input.parseFunc(input.value) : input.value);

  const validateInput = (input:any) => {
    let alert: string = null;
    if (input.validators) {
      input.error = false;
      input.helperText = '';
      for (const v of input.validators) {
        alert = v.isValidFun && !v.isValidFun(input.value) ? v.alert : alert;
        if (alert && alert.length) { break; }
      }
    }
    input.helperText = alert;
    input.error = !!((alert && alert.length > 0));
  };

  return { inputs, handleChange, handleSubmit };
};

export default useForm;
