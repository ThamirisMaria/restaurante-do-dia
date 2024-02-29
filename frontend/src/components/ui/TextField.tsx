import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

interface TextFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder: string;
  width?: {};
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.error && meta.touched) || false}>
      <FormLabel fontSize={{ base: "18x", md: "20px" }}>{label}</FormLabel>
      <Input
        fontSize={{ base: "16px", md: "18px" }}
        h={{ base: "50px", md: "52px" }}
        {...field}
        {...props}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
