import { JSON } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Event extends Model<Event> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  uuid: string;

  @Column
  stream: string;

  @Column
  type: string;

  @Column({ type: JSON })
  data: any;
}

@Table
export class Snapshot extends Model<Snapshot> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  stream: string;

  @Column
  version: number;

  @Column({ type: JSON })
  data: string;
}

export const EVENT_REPOSITORY = Symbol("EventRepository");
export const SNAPSHOT_REPOSITORY = Symbol("EventRepository");

export const eventsProvider = [
  {
    provide: EVENT_REPOSITORY,
    useValue: Event
  },
  {
    provide: SNAPSHOT_REPOSITORY,
    useValue: Snapshot
  },
];
