// import { ChevronRightIcon, CheckIcon } from "@chakra-ui/icons";
// import {
//   Stepper,
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepIcon,
//   StepNumber,
//   StepTitle,
//   StepDescription,
//   StepSeparator,
//   Spacer,
//   Box,
// } from "@chakra-ui/react";

// const FormStepper = () => {
//   return (
//     <>
//       <Stepper
//         colorScheme="green"
//         index={activeStep}
//         display={{ base: "none", sm: "flex" }}
//       >
//         {steps.map((step, index) => (
//           <Step key={`desktop-${index}`}>
//             <StepIndicator>
//               <StepStatus
//                 complete={<StepIcon />}
//                 incomplete={<StepNumber />}
//                 active={<StepNumber />}
//               />
//             </StepIndicator>

//             <Box flexShrink="0">
//               <StepTitle>{step.title}</StepTitle>
//               <StepDescription>{step.description}</StepDescription>
//             </Box>
//             <StepSeparator />
//           </Step>
//         ))}
//       </Stepper>
//       <Stepper
//         colorScheme="green"
//         index={activeStep}
//         display={{ base: "flex", sm: "none" }}
//       >
//         {steps.map((step, index) =>
//           activeStep === index + 1 ? (
//             <Step key={`mobile-${index}`}>
//               <StepIndicator>
//                 <StepStatus
//                   complete={<StepIcon />}
//                   incomplete={<StepNumber />}
//                   active={<StepNumber />}
//                 />
//               </StepIndicator>
//               <Box flexShrink="0">
//                 <StepTitle>{step.title}</StepTitle>
//                 <StepDescription>{step.description}</StepDescription>
//               </Box>

//               <Spacer />
//               <ChevronRightIcon color="gray.500" />
//               <Spacer />
//               <StepIndicator>
//                 <StepStatus
//                   complete={activeStep <= 2 ? activeStep + 1 : <CheckIcon />}
//                   incomplete={<StepNumber />}
//                   active={<StepNumber />}
//                 />
//               </StepIndicator>
//             </Step>
//           ) : (
//             <></>
//           )
//         )}
//       </Stepper>
//     </>
//   );
// };

// export default FormStepper;
