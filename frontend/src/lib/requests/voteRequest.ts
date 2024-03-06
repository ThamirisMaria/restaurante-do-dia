import { AxiosError } from "axios";
import { http } from "./http";
import { Restaurant } from "./listRestaurantsRequest";

interface VoteRequest {
  name: string;
  description: string;
  website: string;
  image: string;
  address: {
    number: string;
    postCode: string;
    neighborhood: string;
    street: string;
    city: string;
    state: string;
  };
}

interface Voter {
  name: string;
  email: string;
}

export interface Vote {
  userDTO: Voter;
  restaurantDTO: Restaurant;
}

interface VotingResponse {
  closed: boolean;
  votes: Vote[];
  winningRestaurantDTO: Restaurant;
}

export async function voteRequest({
  address,
  name,
  description,
  website,
  image,
}: VoteRequest): Promise<[Error | undefined, VotingResponse | undefined]> {
  try {
    const response = await http.post<VotingResponse>("/vote", {
      name,
      description,
      website,
      image,
      address,
    });
    console.log(response.data);
    return [undefined, response.data];
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        return [new Error("NETWORK_CONNECTION_ISSUE"), undefined];
      }
    }
    return [new Error("UNEXCEPTED_ERROR"), undefined];
  }
}
