import {Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';
import StatusEnum from './status.enum';
import { BaseEntity } from './base.entity';
@Entity('todo')
export class TodoEntity extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({length:50, unique: true})
name: string;
@Column()
description: string;
@Column()
status:StatusEnum;
}