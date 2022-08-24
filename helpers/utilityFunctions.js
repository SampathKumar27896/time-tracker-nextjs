const apiFetcher = async (args) => {
  try {
    const requestOptions = {
      method: args.method,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    if (args.method === `POST`) {
      requestOptions.body = JSON.stringify(args.requestBody);
    }
    if (args.headers) {
      requestOptions.headers = args.headers;
    }
    const result = await fetch(args.url, requestOptions);
    return await result.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default apiFetcher;
