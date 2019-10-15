import { Message } from './message';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message(null, null, null, null, null, null, null)).toBeTruthy();
  });
});
