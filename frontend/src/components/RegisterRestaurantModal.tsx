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
  Heading,
  Spacer,
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, Form, useFormikContext } from "formik";
import RestaurantTextField from "./ui/RestaurantTextField";
import { FormValues } from "./registerRestaurant/RegisterRestaurantForm";
import { addressRequest } from "@/lib/requests/addressRequest";

const RegisterRestaurantModal = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [loading, setLoading] = useState(false);
  const props = useFormikContext<FormValues>();

  const steps = [
    { title: "1º", description: t("restaurant.steps.name-description") },
    { title: "2º", description: t("restaurant.steps.address") },
    { title: "3º", description: t("restaurant.steps.media") },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [error, response] = await addressRequest(
        values.address.postCode,
        setLoading
      );
      if (!error && response) {
        const { logradouro, bairro, localidade, uf } = response;
        setFieldValue("address.street", logradouro);
        setFieldValue("address.neighborhood", bairro);
        setFieldValue("address.city", localidade);
        setFieldValue("address.state", uf);
      }
    };

    fetchData();
  }, [values.address.postCode, setLoading, setFieldValue]);

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={() => {
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
            <Form>
              <VStack spacing={4}>
                <Heading
                  textAlign="center"
                  fontSize={{ base: "20px", sm: "30px", md: "35px" }}
                  as="h1"
                >
                  {t("restaurant.add")}
                </Heading>
                {activeStep === 1 && (
                  <>
                    <Field
                      name="name"
                      component={RestaurantTextField}
                      label={t("restaurant.field.name") + " *"}
                    />
                    <Field
                      name="description"
                      component={RestaurantTextField}
                      label={t("restaurant.field.description") + " *"}
                    />
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <VStack
                      display={{ base: "flex", sm: "block" }}
                      width={{ base: "90%", sm: "100%" }}
                    >
                      <Field
                        name="address.postCode"
                        component={RestaurantTextField}
                        label={t("restaurant.field.address.postCode") + " *"}
                      />
                    </VStack>
                    <Field
                      name="address.street"
                      component={RestaurantTextField}
                      label={t("restaurant.field.address.street") + " *"}
                    />
                    <Field
                      name="address.number"
                      component={RestaurantTextField}
                      label={t("restaurant.field.address.number") + " *"}
                    />
                    <Field
                      name="address.neighborhood"
                      component={RestaurantTextField}
                      label={t("restaurant.field.address.neighborhood") + " *"}
                    />
                    <Field
                      name="address.city"
                      component={RestaurantTextField}
                      label={t("restaurant.field.address.city") + " *"}
                    />
                    <Field
                      name="address.state"
                      component={RestaurantTextField}
                      label={t("restaurant.field.address.state") + " *"}
                    />
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <Field
                      name="website"
                      component={RestaurantTextField}
                      label={t("restaurant.field.website")}
                    />
                    <Field
                      name="image"
                      component={RestaurantTextField}
                      label={t("restaurant.field.image")}
                    />
                  </>
                )}
              </VStack>

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
                    isLoading={props.isSubmitting || loading}
                    isDisabled={!(props.isValid && props.dirty)}
                    onClick={() =>
                      setTimeout(() => {
                        location.reload();
                        onClose();
                      }, 1000)
                    }
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
            </Form>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" colorScheme="red" onClick={onClose}>
              {t("restaurant.cancel")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RegisterRestaurantModal;
