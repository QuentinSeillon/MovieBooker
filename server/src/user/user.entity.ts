import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "src/reservation/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
