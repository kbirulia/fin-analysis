import { text, TextScopes } from '../constants';

export type RequestReturnType<DataType> = {
  data?: DataType;
  error?: string;
};

export const request = async <DataType>(
  requestPromise: Promise<DataType>,
  errorMessage = text[TextScopes.request].apiFail,
): Promise<RequestReturnType<DataType>> => {
  try {
    const response = await requestPromise;

    return { data: response };
  } catch (error) {
    return { error: errorMessage };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const createRequest =
  <DataType>(
    apiCall: (...props: any[]) => Promise<DataType>,
    defaultError?: string,
  ) =>
    (...payload: any[]): Promise<RequestReturnType<DataType>> =>
      request(apiCall(...payload), defaultError);

export default createRequest;

