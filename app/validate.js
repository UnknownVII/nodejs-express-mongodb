import pkg from "@hapi/joi";
const { object, string } = pkg;

//OBJECT VALIDATION
const objectValidation = (data) => {
  const schema = object({
    first_name: string().min(3).required(),
    last_name: string().min(3).required(),
  });
  return schema.validate(data);
};

const _objectValidation = objectValidation;
export { _objectValidation as objectValidation };
