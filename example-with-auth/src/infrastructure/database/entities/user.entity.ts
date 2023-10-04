import {
  Column,
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "", select: false })
  refreshToken: string;
}

export const USER_MODEL_REPOSITORY = Symbol("UserModelRepository");

export const userProviders = [
  {
    provide: USER_MODEL_REPOSITORY,
    useFactory: (datasource: DataSource) => datasource.getRepository(User),
    inject: [DataSource],
  },
];
