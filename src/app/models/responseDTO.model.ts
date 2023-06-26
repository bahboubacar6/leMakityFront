export interface ResponseDTO {

    statusCode: number;
    status: string;
    reason: string;
    message:string;
    data: {
      response: {
        accessToken: string
        tokenType: string
        expiresIn: number
      }
    }
  }