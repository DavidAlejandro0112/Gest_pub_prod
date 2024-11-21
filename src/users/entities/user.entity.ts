import { Post } from "src/posts/entities/post.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    
    @Column({nullable: false, type: 'varchar', length: 255 })
    password:string;
    
    @Column({nullable: false, type: 'varchar', length: 255 })
    nombre:string;

    
    @Column({type: 'varchar', unique: true, length: 150, nullable: false})
    email:string;
    
    @Column({ default: "user" })
    rol: string;

    @DeleteDateColumn()
    deleteAt:Date;

    @OneToOne(() => Profile, (profile) => profile.user, {
        eager: true, cascade: true, onDelete: 'CASCADE'
    })
    @JoinColumn()
    profile?: Profile;
    @OneToMany(() => Post, (post) => post.user,//{eager: true, cascade: true, onDelete: 'CASCADE'}
    )
    posts: Post[];

    @ManyToMany(() => Product, (product) => product.users, // { eager: true, cascade: true, onDelete: 'CASCADE'}
        )
    @JoinTable() 
    products: Product[];


}
