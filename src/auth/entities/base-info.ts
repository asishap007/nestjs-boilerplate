import { Column } from 'typeorm';

export class BaseInfo {
  @Column()
  name: string;
  @Column({ type: 'text' })
  description: string;
}
