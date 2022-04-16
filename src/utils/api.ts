import axios from "axios";

export interface ResponseType<T> {
  status:
    | "success"
    | "notfound"
    | "badrequest"
    | "unauthorized"
    | "forbidden"
    | "unknown"
    | "networkerror";
  errorMessage?: any;
  responseData?: T;
}

export interface RequestType<T> {
  method: "get" | "post" | "patch";
  path: string;
  params: any;
  data: T;
}

async function request<RequestDataType, ResponseDataType>(
  req: RequestType<RequestDataType>
): Promise<ResponseType<ResponseDataType>> {
  let res;
  try {
    res = await axios("https://blog.api.tth37.xyz" + req.path, {
      params: req.params,
      method: req.method,
      data: req.data,
      //  headers: {
      //    authorization: authStore.userWithToken
      //      ? `Bearer ${authStore.userWithToken.token}`
      //      : "",
      //  },
      validateStatus: () => true,
    });
  } catch (e: any) {
    console.error(e);
    return {
      status: "networkerror",
    };
  }

  switch (res.status) {
    case 200:
    case 201:
      return {
        status: "success",
        responseData: res.data,
      };
    case 400:
      return {
        status: "badrequest",
        errorMessage: res.data,
      };
    case 401:
      return {
        status: "unauthorized",
        errorMessage: res.data.message,
      };
    case 403:
      return {
        status: "forbidden",
        errorMessage: res.data,
      };
    case 404:
      return {
        status: "notfound",
        errorMessage: res.data.message,
      };
    default:
      return {
        status: "unknown",
        errorMessage: res.data.message,
      };
  }
}

/**
 * RequestParamsType, ResponseDataType
 * @returns a function which sends a GET request to the given path
 */
export function createGetRequest<RequestParamsType, ResponseDataType>(
  path: string
) {
  return (params?: RequestParamsType) => {
    return request<null, ResponseDataType>({
      method: "get",
      path,
      params,
      data: null,
    });
  };
}

/**
 * RequestDataType, ResponseDataType
 * @returns a function which sends a POST request to the given path
 */
export function createPostRequest<RequestDataType, ResponseDataType>(
  path: string
) {
  return (data: RequestDataType, params?: any) => {
    return request<RequestDataType, ResponseDataType>({
      method: "post",
      path,
      params,
      data,
    });
  };
}
