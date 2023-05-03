export class Token {
  private accessToken: string;
  private tokenType: string;

  constructor() {
    this.accessToken = '';
    this.tokenType = '';
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getTokenType() {
    return this.tokenType;
  }

  setTokenType(tokenType: string) {
    this.tokenType = tokenType;
  }
}
