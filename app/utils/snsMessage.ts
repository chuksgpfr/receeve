import { MessageType } from "../models/eventTypes";

class SnsBody {
  createMessageBody( body: any ) {
    const { 'event-data': event_data } = body;
    console.log("eventData ====> ", event_data);
    const message: MessageType = {
      Provider: "Mailgun",
      timestamp: event_data.timestamp,
      type: `email ${event_data.event}`,
    };
    return message;
  }
}

export default new SnsBody();
