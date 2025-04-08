import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @ApiProperty({ example: 'test@gmail.com', description: 'l\'adresse mail de l\'utilisateur' })
    email: string;

    @Column()
    @ApiProperty({ example: 'Password', description: 'le mot de pass de l\'utilisateur' })
    password: string;
}
