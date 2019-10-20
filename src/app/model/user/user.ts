export class User {
    constructor(public id: string,
                public firstName: string,
                public midName: string,
                public lastName: string,
                public imageURL: string,
                public lastSeen: Date,
                public isActive: boolean) {}
}

export class AuthUser {
    constructor(public email: string,
                public password: string) {}
}
