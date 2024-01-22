import { Inject, Injectable } from "@nestjs/common";
import {
  Event,
  EVENT_REPOSITORY,
  Snapshot,
  SNAPSHOT_REPOSITORY,
} from "./entities/event";
import { ApplicationEvents } from "./application-events";
import { StorableEvent } from "./interface/storable-event";
import { ProjectionClasses } from "./projection-classes";

@Injectable()
export class EventStore {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof Event,
    @Inject(SNAPSHOT_REPOSITORY)
    private readonly snapshotRepository: typeof Snapshot,
    private readonly appEvents: ApplicationEvents,
    private readonly projectionClasses: ProjectionClasses,
  ) {}

  public async getEvents(
    aggregateName: string,
    id: string,
  ): Promise<StorableEvent[]> {
    const events = await this.eventRepository.findAll({
      where: {
        stream: this.getStreamName(aggregateName, id),
      },
    });
    const storableEvents = events.map((event) => {
      return this.getStorableEventFromPayload(event.dataValues);
    });

    return storableEvents;
  }

  protected async getLastSnapshot(stream: string) {
    throw new Error("Not implemented");
  }

  public async getEvent(uuid: string): Promise<StorableEvent> {
    const event = await this.eventRepository.findOne({ where: { uuid } });
    return this.getStorableEventFromPayload(event.dataValues);
  }

  public async storeEvent<T extends StorableEvent>(event: T): Promise<void> {
    const { aggregate, name, id, payload, uuid } = event;
    try {
      const {
        dataValues: { createdAt },
      } = await Event.create({
        uuid,
        stream: this.getStreamName(aggregate, id),
        type: name,
        data: payload,
      });
      this.projectionClasses.runProjectionClass({ ...event, createdAt });
    } catch (error) {
      console.warn(error);
    }
  }

  private getStorableEventFromPayload(event: Event): StorableEvent {
    const eventInstance = this.appEvents.getEventByName(event.type);
    return new eventInstance(JSON.parse(event.data));
  }

  private getStreamName(stream: string, id: string) {
    return `${stream}-${id}`;
  }
}
