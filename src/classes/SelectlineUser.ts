export class SelectlineUser  {
    private username: string;
    private password: string;
    private appKey: string;

    constructor() {
        this.username = "";
        this.password = "";
        this.appKey = "";
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getAppKey(): string {
        return this.appKey;
    }

    setAppKey(appKey: string): void {
        this.appKey = appKey;
    }
}