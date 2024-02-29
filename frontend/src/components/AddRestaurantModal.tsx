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
import { useTranslation } from "react-i18next";
import TextField from "./ui/TextField";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { useValidation } from "@/hooks/useValidation";

interface AddressValues {
  number: string;
  postCode: string;
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
  const validation = useValidation(t, "restaurant");

  const steps = [
    { title: "1º", description: t("restaurant.steps.name-description") },
    { title: "2º", description: t("restaurant.steps.address") },
    { title: "3º", description: t("restaurant.steps.media") },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

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
                <Step key={index}>
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
                  <Step key={index}>
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
              initialValues={{
                name: "",
                description: "",
                website: "",
                image: "",
                address: {
                  number: "",
                  postCode: "",
                  neighborhood: "",
                  street: "",
                  city: "",
                  state: "",
                },
              }}
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
                        ></TextField>
                        <TextField
                          label={t("restaurant.field.description") + " *"}
                          name="description"
                          placeholder={t("restaurant.field.description")}
                        ></TextField>
                      </>
                    )}

                    {activeStep === 2 && (
                      <>
                        <VStack
                          display={{ base: "flex", sm: "block" }}
                          width={{ base: "90%", sm: "100%" }}
                        >
                          <TextField
                            label={
                              t("restaurant.field.address.postCode") + " *"
                            }
                            name="address.postCode"
                            placeholder={t("restaurant.field.address.postCode")}
                          ></TextField>
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
                            placeholder={t("restaurant.field.address.street")}
                          ></TextField>
                          <Spacer />
                          <TextField
                            label={t("restaurant.field.address.number") + " *"}
                            name="address.number"
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
                            placeholder={t("restaurant.field.address.city")}
                          ></TextField>
                          <Spacer />
                          <TextField
                            label={t("restaurant.field.address.state") + " *"}
                            name="address.state"
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
                        ></TextField>

                        <TextField
                          type="url"
                          label={t("restaurant.field.image")}
                          name="image"
                          placeholder={t("restaurant.field.image")}
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
