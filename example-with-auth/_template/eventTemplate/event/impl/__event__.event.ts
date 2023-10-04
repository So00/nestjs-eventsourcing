import { StorableEvent } from "src/infrastructure/eventsource/interface/storable-event";

import { I__event__ } from "../../interface/I__event__(pascalCase)";
import { __domain__(constantCase)_AGGREGATE_NAME } from "../enum";

export class __event__Event extends StorableEvent {
  aggregate = __domain__(constantCase)_AGGREGATE_NAME;

  constructor(readonly payload: I__event__, version) {
    super(payload);
    this.version = version;
    this.id = payload.uuid;
  }
}
