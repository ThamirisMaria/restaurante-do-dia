import { VotingResponse } from "@/lib/requests/getCurrentVotingRequest";
import { ViewIcon, CloseIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  IconButton,
  Spacer,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { WinningRestaurant } from "./WinningRestaurant";

export const CurrentVotingModal = (voting: VotingResponse) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <Button
        leftIcon={<ViewIcon />}
        colorScheme="green"
        onClick={() => {
          onOpen();
        }}
      >
        {t("voting.view_result")}
      </Button>
      <Drawer size="xl" placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent p={10}>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Heading color="#2f855a">
                {voting.closed ? t("voting.closed") : t("voting.in-progress")}
              </Heading>
              <Spacer />
              <IconButton
                variant="ghost"
                colorScheme="grey"
                aria-label="Search database"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <WinningRestaurant
              closed={voting.closed}
              votes={voting.votes}
              winningRestaurantDTO={voting.winningRestaurantDTO}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
