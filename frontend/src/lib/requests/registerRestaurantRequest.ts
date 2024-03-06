import { AxiosError } from "axios";
import { http } from "./http";

interface RegisterRestaurantResponse {
  id: number;
}

interface RegisterRestaurantRequest {
  accessToken: string | null;
  address: {
    number: string;
    postCode: string;
    neighborhood: string;
    street: string;
    city: string;
    state: string;
  };
  name: string;
  description: string;
  website: string;
  image: string;
}

export async function registerRestaurantRequest({
  accessToken,
  address,
  name,
  description,
  website,
  image,
}: RegisterRestaurantRequest): Promise<
  [Error | undefined, RegisterRestaurantResponse | undefined]
> {
  try {
    console.log(accessToken);
    const response = await http.post<RegisterRestaurantResponse>(
      "/restaurant",
      {
        name,
        description,
        website,
        image,
        address,
      }
    );
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
