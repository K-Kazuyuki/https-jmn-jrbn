type RequestBody = {
  url: string;
  body?: string | null;
  method?: string | null;
  headers?: Record<string, string> | null;
};

type Response = {
  ok: boolean;
  status: number;
  statusText: string | null;
  value: unknown | null;
};

const d1Access = async (input: RequestBody): Promise<Response> => {
  try {
    const headers = input.headers
      ? input.headers
      : { "Content-Type": "application/json" };
    const method = input.method ? input.method : "POST";
    return await fetch(input.url, {
      method: method,
      headers: headers,
      body: input.body,
    }).then(async (res) => {
      const value = res.ok ? await res.json() : null;
      console.log("Response:", value);
      return {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        value: value,
      };
    });
  } catch (e) {
    let message = "Internal Server Error";
    if (e instanceof Error) message = e.message;
    return {
      ok: false,
      status: 500,
      value: null,
      statusText: message,
    };
  }
};
export default d1Access;
