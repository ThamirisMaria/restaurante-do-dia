import { AxiosError } from "axios";
import { http } from "./http";

interface SignUpSuccessResponse {
  successMessage: string;
}

export async function signUpRequest(
  name: string,
  lastname: string,
  email: string,
  password: string
): Promise<[Error | undefined, SignUpSuccessResponse | undefined]> {
  try {
    const fullname = `${name} ${lastname}`;
    const response = await http.post<SignUpSuccessResponse>("/auth/register", {
      name: fullname,
      email,
      password,
    });
    return [undefined, response.data];
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        return [new Error("NETWORK_CONNECTION_ISSUE"), undefined];
      }
      return [new Error("INVALID_CREDENTIALS"), undefined];
    }
    return [new Error("UNEXCEPTED_ERROR"), undefined];
  }
}
