export class SendEmailEvent {
  constructor(readonly from: string, readonly to: string, readonly subject: string, readonly body: string) {}
}
