import {
  AddIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Spacer,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Toast,
  VStack,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "./ui/TextField";
import { Field, FieldProps, Formik, FormikHelpers, FormikProps } from "formik";
import { useValidation } from "@/hooks/useValidation";
import axios from "axios";

interface AddressValues {
  postCode: string;
  number: string;
  neighborhood: string;
  street: string;
  city: string;
  state: string;
}

interface Values {
  name: string;
  description: string;
  website: string;
  image: string;
  address: AddressValues;
}

const addressInitialValues: AddressValues = {
  postCode: "",
  number: "",
  neighborhood: "",
  street: "",
  city: "",
  state: "",
};

const initialValues: Values = {
  name: "",
  description: "",
  website: "",
  image: "",
  address: addressInitialValues,
};

const handleFormSubmit = async (
  { name, description, website, image, address }: Values,
  actions: FormikHelpers<{
    name: string;
    description: string;
    website: string;
    image: string;
    address: AddressValues;
  }>
) => {
  console.log(
    name,
    description,
    website,
    image,
    address,
    actions.setFieldError
  );
};

export const AddRestaurantModal = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef(null);
  const validation = useValidation(t, "restaurant");
  const [address] = useState<AddressValues>(initialValues.address);
  const [values, setValues] = useState<Values>(initialValues);

  const steps = [
    { title: "1º", description: t("restaurant.steps.name-description") },
    { title: "2º", description: t("restaurant.steps.address") },
    { title: "3º", description: t("restaurant.steps.media") },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const [cep, setCep] = useState("");
  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`
          );
          setValues({
            ...values,
            address: {
              ...address,
              neighborhood: response.data.bairro,
              street: response.data.logradouro,
              city: response.data.localidade,
              state: response.data.uf,
            },
          });
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        }
      }
    };

    fetchAddress();
  }, [cep]);

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={() => {
          setActiveStep(1);
          onOpen();
        }}
      >
        {t("restaurant.add-restaurant")}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        size={{ sm: "sm", lg: "md" }}
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {t("restaurant.new-restaurant")}
          </DrawerHeader>
          <DrawerBody>
            <Stepper
              colorScheme="green"
              index={activeStep}
              display={{ base: "none", sm: "flex" }}
            >
              {steps.map((step, index) => (
                <Step key={`desktop-${index}`}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Stepper
              colorScheme="green"
              index={activeStep}
              display={{ base: "flex", sm: "none" }}
            >
              {steps.map((step, index) =>
                activeStep === index + 1 ? (
                  <Step key={`mobile-${index}`}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <Spacer />
                    <ChevronRightIcon color="gray.500" />
                    <Spacer />
                    <StepIndicator>
                      <StepStatus
                        complete={
                          activeStep <= 2 ? activeStep + 1 : <CheckIcon />
                        }
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                  </Step>
                ) : (
                  <></>
                )
              )}
            </Stepper>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={(values, actions) => {
                handleFormSubmit(values, actions);
              }}
            >
              {(props: FormikProps<Values>) => (
                <VStack>
                  <Heading
                    textAlign="center"
                    fontSize={{ base: "20px", sm: "30px", md: "35px" }}
                    as="h1"
                  >
                    {t("restaurant.add")}
                  </Heading>
                  <VStack
                    as="form"
                    onSubmit={() => {
                      props.submitForm();
                    }}
                    padding={5}
                  >
                    {activeStep === 1 && (
                      <>
                        <TextField
                          label={t("restaurant.field.name") + " *"}
                          name="name"
                          placeholder={t("restaurant.field.name")}
                          value={values.name}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              name: e.target.value,
                            })
                          }
                        ></TextField>
                        <TextField
                          label={t("restaurant.field.description") + " *"}
                          name="description"
                          placeholder={t("restaurant.field.description")}
                          value={values.description}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              description: e.target.value,
                            })
                          }
                        ></TextField>
                      </>
                    )}

                    {activeStep === 2 && (
                      <>
                        <VStack
                          display={{ base: "flex", sm: "block" }}
                          width={{ base: "90%", sm: "100%" }}
                        >
                          <Field name="postCode">
                            {({ field }: FieldProps) => (
                              <TextField
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setCep(e.target.value);
                                }}
                                label={
                                  t("restaurant.field.address.postCode") + " *"
                                }
                                placeholder={t(
                                  "restaurant.field.address.postCode"
                                )}
                              ></TextField>
                            )}
                          </Field>
                        </VStack>
                        <HStack
                          display={{ base: "block", sm: "flex" }}
                          width={{ base: "90%", sm: "100%" }}
                        >
                          <TextField
                            width={{
                              md: "150",
                            }}
                            label={t("restaurant.field.address.street") + " *"}
                            name="address.street"
                            value={values.address.street}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                address: {
                                  ...values.address,
                                  street: e.target.value,
                                },
                              })
                            }
                            placeholder={t("restaurant.field.address.street")}
                          ></TextField>
                          <Spacer />
                          <TextField
                            label={t("restaurant.field.address.number") + " *"}
                            name="address.number"
                            value={values.address.number}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                address: {
                                  ...values.address,
                                  number: e.target.value,
                                },
                              })
                            }
                            placeholder={t("restaurant.field.address.number")}
                          ></TextField>
                        </HStack>
                        <VStack
                          display={{ base: "flex", sm: "block" }}
                          width={{ base: "90%", sm: "100%" }}
                        >
                          <TextField
                            label={
                              t("restaurant.field.address.neighborhood") + " *"
                            }
                            name="address.neighborhood"
                            value={values.address.neighborhood}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                address: {
                                  ...values.address,
                                  neighborhood: e.target.value,
                                },
                              })
                            }
                            placeholder={t(
                              "restaurant.field.address.neighborhood"
                            )}
                          ></TextField>
                        </VStack>

                        <HStack display={{ base: "block", sm: "flex" }}>
                          <TextField
                            width={{
                              md: "150",
                            }}
                            label={t("restaurant.field.address.city") + " *"}
                            name="address.city"
                            value={values.address.city}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                address: {
                                  ...values.address,
                                  city: e.target.value,
                                },
                              })
                            }
                            placeholder={t("restaurant.field.address.city")}
                          ></TextField>
                          <Spacer />
                          <TextField
                            label={t("restaurant.field.address.state") + " *"}
                            name="address.state"
                            value={values.address.state}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                address: {
                                  ...values.address,
                                  state: e.target.value,
                                },
                              })
                            }
                            placeholder={t("restaurant.field.address.state")}
                          ></TextField>
                        </HStack>
                      </>
                    )}

                    {activeStep === 3 && (
                      <>
                        <TextField
                          type="url"
                          label={t("restaurant.field.website")}
                          name="website"
                          placeholder={t("restaurant.field.website")}
                          value={values.website}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              website: e.target.value,
                            })
                          }
                        ></TextField>

                        <TextField
                          type="url"
                          label={t("restaurant.field.image")}
                          name="image"
                          placeholder={t("restaurant.field.image")}
                          value={values.image}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              image: e.target.value,
                            })
                          }
                        ></TextField>
                      </>
                    )}

                    <ButtonGroup mt={4}>
                      {activeStep > 1 && (
                        <Button
                          leftIcon={<ArrowBackIcon />}
                          colorScheme="green"
                          onClick={() => {
                            setActiveStep(activeStep - 1);
                          }}
                        >
                          {t("restaurant.steps.previous")}
                        </Button>
                      )}
                      {activeStep > 0 && activeStep < 3 && (
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          colorScheme="green"
                          onClick={() => {
                            setActiveStep(activeStep + 1);
                          }}
                        >
                          {t("restaurant.steps.next")}
                        </Button>
                      )}
                      {activeStep === 3 && (
                        <Button
                          colorScheme="green"
                          type="submit"
                          isLoading={props.isSubmitting}
                          isDisabled={!(props.isValid && props.dirty)}
                        >
                          {t("restaurant.add")}
                        </Button>
                      )}
                    </ButtonGroup>
                    {activeStep === 3 && !props.isValid && props.dirty && (
                      <Toast
                        colorScheme="orange"
                        description={t("restaurant.steps.toast")}
                      />
                    )}
                  </VStack>
                </VStack>
              )}
            </Formik>
            <Stack spacing="24px"></Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              {t("restaurant.cancel")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
