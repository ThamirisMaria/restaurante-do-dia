import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

interface TextFieldProps {
  field: any;
  form: any;
  label: string;
}

const TextField = ({ field, form, ...props }: TextFieldProps) => {
  return (
    <FormControl isInvalid={(field.error && field.touched) || false}>
      <FormLabel fontSize={{ base: "18x", md: "20px" }}>
        {field.label}
      </FormLabel>
      <Input
        fontSize={{ base: "16px", md: "18px" }}
        h={{ base: "50px", md: "52px" }}
        {...field}
        {...props}
      />
      <FormErrorMessage>{field.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
