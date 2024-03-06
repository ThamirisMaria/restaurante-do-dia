import { VotingResponse } from "@/lib/requests/getCurrentVotingRequest";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Image,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const WinningRestaurant = (voting: VotingResponse) => {
  const { t } = useTranslation();

  const numberOfVotes = (postCode: string, number: string) => {
    const restaurantVotes = voting.votes.filter((vote) => {
      return (
        vote.restaurantDTO.address.postCode === postCode &&
        vote.restaurantDTO.address.number === number
      );
    });
    console.log(voting.votes);
    console.log(restaurantVotes);
    return restaurantVotes.length;
  };

  return (
    <HStack flexDirection={{ base: "column", lg: "row" }}>
      <VStack flex={3} minH="80vh" marginBottom={20} marginTop={10}>
        <Heading as="h2" size="md" fontSize={30}>
          {voting.closed
            ? t("voting.result.restaurant", ":")
            : voting.votes.length > 0
            ? t("voting.most-voted-restaurant")
            : t("voting.first-to-vote")}
        </Heading>
        <Spacer />
        <Card p="auto" bgColor="#2F855A" color="white" maxW="md">
          <CardHeader>
            <HStack>
              <Heading size="md">{voting.winningRestaurantDTO?.name}</Heading>
              <Spacer />
              <Link to={voting.winningRestaurantDTO.website} target="_blank">
                <IconButton
                  bgColor="#2F855A"
                  color="white"
                  _hover={{ bgColor: "#226845" }}
                  variant="outline"
                  aria-label="ExternalLinkIcon"
                  icon={<ExternalLinkIcon />}
                />
              </Link>
            </HStack>
          </CardHeader>
          <Image
            objectFit="cover"
            src={voting.winningRestaurantDTO?.image}
            alt="winning restaurant image"
          />
          <CardBody>
            <Text>{voting.winningRestaurantDTO?.description}</Text>
            <HStack bgColor="#CADBD2" color="black" p="5%" borderRadius="5px">
              <Image
                as="img"
                width="30"
                height="30"
                src="src\assets\address.png"
                alt="address"
                alignSelf="flex-start"
              />
              <Spacer />
              <Text>
                {voting.winningRestaurantDTO?.address.city}
                {" - "}
                {voting.winningRestaurantDTO?.address.state}
                {", "}
                {voting.winningRestaurantDTO?.address.street}
                {", nº "}
                {voting.winningRestaurantDTO?.address.number}
                {", "}
                {voting.winningRestaurantDTO?.address.neighborhood}
                {"."}
              </Text>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
      <VStack marginLeft={{ lg: "20" }}>
        <Box borderRadius="full" bgColor="#2F855A" p={2}>
          <VStack divider={<StackDivider borderColor="gray.200" />}>
            <Box
              fontSize={30}
              color="white"
              textAlign="center"
              width="40px"
              height="40px"
              lineHeight="40px"
            >
              {numberOfVotes(
                voting.winningRestaurantDTO?.address.postCode!,
                voting.winningRestaurantDTO?.address.number!
              )}
            </Box>

            <Text color="white" paddingLeft="8" paddingRight="8" fontSize={30}>
              {t("voting.result.votes")}
            </Text>

            <Box
              fontSize={30}
              color="white"
              textAlign="center"
              width="40px"
              height="40px"
              lineHeight="40px"
            >
              {voting.votes.length}
            </Box>
          </VStack>
        </Box>
        <Spacer />
        <Heading
          as="h4"
          borderRadius={5}
          fontSize={30}
          p={2}
          color="white"
          bgColor="#2F855A"
        >
          {t("voting.history")}
        </Heading>
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          {voting.votes.map((vote) => (
            <Text>
              {vote.userDTO.name} {t("voted_for")} {vote.restaurantDTO.name}
            </Text>
          ))}
        </VStack>
      </VStack>
    </HStack>
  );
};
