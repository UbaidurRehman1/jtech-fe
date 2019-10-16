import { Message } from './messageModel';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message(null, null, null, null, null, null, null)).toBeTruthy();
  });
});
