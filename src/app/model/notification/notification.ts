export class Notification {
    // 	private Long id;
    // 	private Long sessionId;
    // 	private Long messageId;
    // 	private Long receiverId;
    // 	private Long senderId;
    // 	private Boolean isSeen;
    constructor(public id: string,
                public sessionId: string,
                public messageId: string,
                public receiverId: string,
                public senderId: string,
                public isSeen: string) {}
}
