import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export function Navigation() {
  const { t } = useTranslation();
  const { accessToken, updateAccessToken } = useAuth();
  const navegate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = "#F0FFF4";

  const logout = () => {
    onClose();
    navegate("/");
    updateAccessToken(null);
  };

  return (
    <Flex as="nav" alignItems="center">
      <Tooltip
        label={t("home-page")}
        bgColor={bgColor}
        color="green"
        placement="right-end"
      >
        <Link to="/">
          <HStack
            marginLeft="10px"
            marginTop="10px"
            _hover={{
              bgColor: bgColor,
              borderRadius: "5px",
            }}
          >
            <Image
              w={{ base: "60px" }}
              src="https://img.icons8.com/dotty/60/2F855A/tableware.png"
              alt="logo"
            />
            <Text
              margin="auto"
              color="green"
              fontSize={{ base: "20px", md: "25px" }}
            >
              {t("nav.app-name")}
            </Text>
          </HStack>
        </Link>
      </Tooltip>
      <Spacer />
      <HStack display={{ base: "none", sm: "flex" }}>
        {accessToken ? (
          <Button
            marginRight="10px"
            variant="outline"
            colorScheme="red"
            onClick={logout}
          >
            <Image
              src="https://img.icons8.com/ios/20/C53030/exit--v1.png"
              alt={t("nav.signout")}
            />
          </Button>
        ) : (
          <>
            <Link to="/signup">
              <Button marginRight="10px" variant="outline" colorScheme="green">
                {t("nav.signup")}
              </Button>
            </Link>
            <Link to="/login">
              <Button marginRight="10px" variant="solid" colorScheme="green">
                {t("nav.login")}
              </Button>
            </Link>
          </>
        )}
      </HStack>
      <HStack display={{ base: "flex", sm: "none" }}>
        <IconButton
          onClick={onOpen}
          aria-label={t("nav.aria-label.menu")}
          bgColor="#CDDED5"
          size="lg"
          marginRight="5px"
          icon={<HamburgerIcon color="green" />}
        />
      </HStack>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{t("nav.menu")}</DrawerHeader>
          <DrawerBody>
            <VStack>
              {accessToken ? (
                <Button
                  marginRight="10px"
                  variant="outline"
                  colorScheme="red"
                  onClick={logout}
                  w="68vw"
                >
                  <Image
                    src="https://img.icons8.com/ios/30/C53030/exit--v1.png"
                    alt={t("nav.signout")}
                  />
                </Button>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="outline" w="68vw">
                      {t("nav.signup")}
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="solid" colorScheme="green" w="68vw">
                      {t("nav.login")}
                    </Button>
                  </Link>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
