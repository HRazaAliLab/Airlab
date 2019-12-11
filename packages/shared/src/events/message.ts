export class Message {
  constructor(readonly groupId: number, readonly type: string, readonly payload: any) {}
}
