import { Injectable, Scope } from "@nestjs/common";

@Injectable( {scope: Scope.REQUEST} )
export class RequestService{
    private requestToken: string;
    private requestTokenType: string

    setRequestToken(token: string){
        this.requestToken = token;
    }

    setRequestTokenType(tokenType: string){
        this.requestTokenType = tokenType;
    }

    getRequestToken(): string{
        return this.requestToken;
    }

    getRequestTokenType(): string{
        return this.requestTokenType;
    }
}
