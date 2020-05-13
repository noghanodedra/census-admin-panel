
export const modelToObject = (model:any) => {
  const record = {};
  model.map((field:any) => {
    record[field.id] = field.value;
  });
  return record;
};
