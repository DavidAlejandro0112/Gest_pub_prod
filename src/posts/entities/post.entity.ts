import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    post:string;


    @DeleteDateColumn()
    deleteAt:Date;

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true, cascade: true, onDelete: 'CASCADE'})
    user: User;
}
