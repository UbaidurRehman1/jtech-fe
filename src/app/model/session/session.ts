import {User} from '../user/user';

export class Session {
    constructor(public id: string,
                public senderId: string,
                public receiverId: string,
                public initiateTime: Date,
                public sender: User,
                public receiver: User) {}
}
