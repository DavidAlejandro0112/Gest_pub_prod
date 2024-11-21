import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product:string;

    @CreateDateColumn()
    fechaCreado:string;
    
    @UpdateDateColumn()
    fechaModificado:string;

    @DeleteDateColumn()
    deleteAt:Date;

    @ManyToMany(() => User, (user) => user.products, {
        eager: true, cascade: true, onDelete: 'CASCADE'})
    users: User[];

}
