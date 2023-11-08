import { CvEntity } from "src/cvs/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skill')
export class SkillEntity  {
@PrimaryGeneratedColumn()
id: number;
@Column()
designation: string;
@ManyToMany(() => CvEntity, cv => cv.skills)
cvs: CvEntity[];

}
