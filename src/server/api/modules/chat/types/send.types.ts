export type typePayload = {
  link: string;
  question: string;
};

export type typeResultData = {
  question: string;
  answer: string;
  sources: {
    pageContent: string;
    metadata: {
      source: string;
      loc: {
        lines: {
          from: number;
          to: number;
        }[];
      };
    };
  }[];
};

export type typeResultError = {
  code: string;
  message: string;
  statusCode: number;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};
