import {User} from '../user/user';

export class Session {
    constructor(public id: string,
                public senderId: string,
                public receiverId: string,
                public isActive: boolean,
                public lastTimeActive: Date,
                public initiateTime: Date,
                public sender: User,
                public reciever: User) {
    }
}
