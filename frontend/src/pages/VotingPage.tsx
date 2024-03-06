//import { AddRestaurantModal } from "@/components/AddRestaurantModal";
// import RestaurantForm from "@/components/RestaurantForm";
import RegisterRestaurantForm from "@/components/registerRestaurant/RegisterRestaurantForm";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  Image,
  Button,
  CardFooter,
  Icon,
  VStack,
  Spacer,
  HStack,
  Badge,
} from "@chakra-ui/react";

import { SpinnerIcon } from "@chakra-ui/icons";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  Restaurant,
  listRestaurantRequest,
} from "@/lib/requests/listRestaurantsRequest";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks";
import { Vote, voteRequest } from "@/lib/requests/voteRequest";
import { getCurrentVotingRequest } from "@/lib/requests/getCurrentVotingRequest";
import { Container } from "react-bootstrap";
import { WinningRestaurant } from "@/components/WinningRestaurant";
import { CurrentVotingModal } from "@/components/CurrentVotingModal";

export const VotingPage = () => {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(0);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const { accessToken } = useAuth();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [votingClosed, setVotingClosed] = useState(false);
  const [winningRestaurant, setWinningRestaurant] = useState<Restaurant>();

  const numberOfVotes = (postCode: string, number: string) => {
    const restaurantVotes = votes.filter((vote) => {
      return (
        vote.restaurantDTO.address.postCode === postCode &&
        vote.restaurantDTO.address.number === number
      );
    });
    console.log(votes);
    console.log(restaurantVotes);
    return restaurantVotes.length;
  };

  useEffect(() => {
    const checkVotingState = async () => {
      const [error, response] = await getCurrentVotingRequest();
      if (response) {
        console.log(response);
        setVotingClosed(response.closed);
        setVotes(response.votes);
        setWinningRestaurant(response.winningRestaurantDTO);
      }
    };
    checkVotingState();
  }, []);

  useEffect(() => {
    listRestaurantRequest(page).then((data) => {
      const [error, response] = data;
      if (response) {
        console.log(response);
        setRestaurants(response);
        setLoadingRestaurants(false);
      } else if (error && error.message === "UNEXCEPTED_ERROR") {
        console.log(error);
        setLoadingRestaurants(true);
        // if (accessToken) {
        //   location.reload();
        // }
      }
    });
  }, [page]);

  const handleVote = async (restaurant: Restaurant) => {
    const [error, response] = await voteRequest(restaurant);
    if (response) {
      setVotes(response.votes);
      location.reload();
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(Math.max(page - 1, 0));
  };

  return (
    <HStack
      flexDirection={{ base: "column", md: "row" }}
      spacing={150}
      paddingTop="10vh"
      maxW="100vw"
      minH="100vh"
    >
      {loadingRestaurants ? (
        <VStack minH="70vh" minW="95vw">
          <Text textAlign="center" fontSize={30} color="gray.500">
            {t("error.unexpected")}
          </Text>
          <SpinnerIcon
            boxSize={16}
            color="#2F855A"
            margin="auto"
            sx={{
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </VStack>
      ) : (
        <>
          <HStack alignSelf="flex-start">
            <VStack>
              {restaurants.length === 0 ? (
                <></>
              ) : (
                <>
                  <RegisterRestaurantForm />
                  <CurrentVotingModal
                    closed={closed}
                    votes={votes}
                    winningRestaurantDTO={winningRestaurant!}
                  />
                </>
              )}
            </VStack>
          </HStack>
          <VStack minH="100vh">
            {!loadingRestaurants && !votingClosed ? (
              <>
                {restaurants.length === 0 ? (
                  <VStack>
                    <Heading as="h1" fontSize={40}>
                      Bem-vindo(a) ao Restaurante do Dia
                    </Heading>
                    <Heading as="h2" fontSize={30}>
                      Adicione restaurantes para iniciar a votação
                    </Heading>
                    <RegisterRestaurantForm />
                  </VStack>
                ) : (
                  <Container>
                    <SimpleGrid
                      minH="90vh"
                      columns={{ base: 1, md: 2, lg: 3 }}
                      spacing={10}
                      margin={10}
                    >
                      {restaurants.map((restaurant, i) => (
                        <Card bgColor="#f0fff4" key={i} maxW="lg">
                          <CardHeader>
                            <Flex>
                              <Flex
                                flex="1"
                                gap="4"
                                alignItems="center"
                                flexWrap="wrap"
                              >
                                <Box>
                                  <Heading size="sm">{restaurant.name}</Heading>
                                </Box>
                              </Flex>
                              <Link to={restaurant.website} target="_blank">
                                <IconButton
                                  bgColor="#2F855A"
                                  color="white"
                                  _hover={{ bgColor: "#226845" }}
                                  variant="outline"
                                  aria-label="ExternalLinkIcon"
                                  icon={<ExternalLinkIcon />}
                                />
                              </Link>
                            </Flex>
                          </CardHeader>
                          <Image
                            objectFit="cover"
                            marginRight={5}
                            marginLeft={5}
                            src={restaurant.image}
                            alt="Chakra UI"
                          />
                          <CardBody>
                            <Text>{restaurant.description}</Text>
                            <HStack bgColor="#CADBD2" p="5%" borderRadius="5px">
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
                                {restaurant.address.city}
                                {" - "}
                                {restaurant.address.state}
                                {", "}
                                {restaurant.address.street}
                                {", nº "}
                                {restaurant.address.number}
                                {", "}
                                {restaurant.address.neighborhood}
                                {"."}
                              </Text>
                            </HStack>
                          </CardBody>
                          <CardFooter
                            justify="space-between"
                            flexWrap="wrap"
                            sx={{
                              "& > button": {
                                minW: "136px",
                              },
                            }}
                          >
                            <Button
                              bgColor="#2F855A"
                              color="white"
                              _hover={{ bgColor: "#226845" }}
                              flex="1"
                              variant="outline"
                              leftIcon={
                                <Flex align="center">
                                  <Image
                                    width="35"
                                    height="35"
                                    src="src\assets\vote.png"
                                    alt="thumb-up"
                                  />
                                  <Text
                                    color="#000"
                                    borderRadius="full"
                                    px="2"
                                    ml="1.5"
                                    mt="3"
                                    mb="1"
                                    margin="3 0 1 1.5"
                                    position="absolute"
                                  >
                                    {numberOfVotes(
                                      restaurant.address.postCode,
                                      restaurant.address.number
                                    )}
                                  </Text>
                                </Flex>
                              }
                              onClick={(e) => handleVote(restaurant)}
                            >
                              {t("voting.vote")}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </SimpleGrid>
                    <HStack
                      alignSelf="flex-end"
                      minW="70vw"
                      position="relative"
                      marginBottom="2%"
                      alignContent="space-between"
                      marginRight="auto"
                    >
                      <Button onClick={handlePreviousPage}>
                        {t("restaurant.steps.previous")}
                      </Button>
                      <Spacer />
                      <Button onClick={handleNextPage}>
                        {t("restaurant.steps.next")}
                      </Button>
                    </HStack>
                  </Container>
                )}
              </>
            ) : (
              <Container>
                <Heading
                  textAlign="center"
                  as="h1"
                  size="md"
                  color="#2F855A"
                  fontSize={40}
                >
                  {t("voting.closed")}
                </Heading>
                {winningRestaurant ? (
                  <WinningRestaurant
                    votes={votes}
                    closed
                    winningRestaurantDTO={winningRestaurant}
                  />
                ) : (
                  <Text textAlign="center" fontSize={20} color="gray.500">
                    {t("voting.no_votes")}
                  </Text>
                )}
              </Container>
            )}
          </VStack>
        </>
      )}
    </HStack>
  );
};
//numero de votos no ícone
