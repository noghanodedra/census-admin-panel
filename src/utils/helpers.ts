
export const modelToObject = (model:any) => {
  const record = {};
  model.map((field:any) => {
    record[field.id] = field.value;
  });
  return record;
};

export const deepCopy = (inObject:any) => {
  let outObject;
  let value;
  let key;

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  // eslint-disable-next-line prefer-const
  outObject = Array.isArray(inObject) ? [] : {};

  // eslint-disable-next-line guard-for-in
  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value);
  }

  return outObject;
};

export const setLookUpOptions = (model: any, data: Object) => {
  model.map((field: any) => {
    if (field.lookUp && field.lookUp.optionsKey) {
      // eslint-disable-next-line no-param-reassign
      field.lookUp.options = [...data[field.lookUp.optionsKey]];
    }
  });
};
