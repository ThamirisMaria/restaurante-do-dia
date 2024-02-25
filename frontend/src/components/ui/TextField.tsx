import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.error && meta.touched) || false}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
