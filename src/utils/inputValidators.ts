export const checkAtLeastLength = (expression:string, length:number) => expression && expression.trim().length >= length;

export const checkIsfilled = (expression: string) => expression && (expression || '').toString().length > 0;

export const checkIsTrue = (expression: string) => expression;

export const checkEmailPattern = (mail: string) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(mail);
};
