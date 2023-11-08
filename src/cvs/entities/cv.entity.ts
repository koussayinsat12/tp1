import { SkillEntity } from 'src/skills/entities/skill.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
@Entity('cv')
export class CvEntity{
@PrimaryGeneratedColumn()
id: number;
@Column({length:50, unique: true})
name: string;
@Column()
firstname: string;
@Column()
age:number;
@Column()
cin:string;
@Column()
job:string;
@Column()
path:string;
@ManyToMany(() => SkillEntity)
  @JoinTable()
  skills: SkillEntity[];

  @ManyToOne(() => UserEntity, user => user.cvs)
  user: UserEntity;
}

