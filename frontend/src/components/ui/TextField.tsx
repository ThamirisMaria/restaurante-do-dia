import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import { ChangeEventHandler } from "react";

interface TextFieldProps {
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  name: string;
  type?: string;
  placeholder: string;
  width?: {};
  value?: string;
  readOnly?: boolean;
}

const TextField = ({ label, onChange, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.error && meta.touched) || false}>
      <FormLabel fontSize={{ base: "18x", md: "20px" }}>{label}</FormLabel>
      <Input
        fontSize={{ base: "16px", md: "18px" }}
        h={{ base: "50px", md: "52px" }}
        {...field}
        {...props}
        onChange={onChange}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
