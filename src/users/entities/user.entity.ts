import { CvEntity } from 'src/cvs/entities/cv.entity';
import {Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
@Entity('user')
export class UserEntity{
@PrimaryGeneratedColumn()
id: number;
@Column({length:50, unique: true})
username: string;
@Column()
email: string;
@Column()
password:string;
@OneToMany(() => CvEntity, cv => cv.user)
cvs: CvEntity[];
}
