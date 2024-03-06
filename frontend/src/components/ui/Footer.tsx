import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      p={4}
      mt="auto"
      bgColor="#2F855A"
      color="white"
      left={0}
      bottom={0}
      width="100%"
    >
      <Text margin="auto">
        Desenvolvido por{" "}
        <Link
          href="https://start.db.tec.br/#conheca-o-programa"
          target="_blank"
        >
          StartDB 2023
        </Link>
        .
      </Text>
    </Flex>
  );
};

export default Footer;
