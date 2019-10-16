import {User} from '../user/user';

export class MessageModel {
    constructor(public id: string,
                public sessionId: string,
                public text: string,
                public ownerId: string,
                public sentTime: Date,
                public seenTime: Date,
                public receivedTime: Date,
                public owner: User) {}
}
