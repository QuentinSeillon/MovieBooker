import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty({ example: 950387, description: 'Id du film a ajouter dans ca liste' })
    movie_id: number

    @Column()
    @ApiProperty({ example: 'Nom_du_film', description: 'Nom du film a enregistrer'})
    movie_name: string

    @Column()
    @ApiProperty({ example: '/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg', description: 'Affiche du film'})
    affiche: string

    @Column()
    @ApiProperty({ example: '2adcd781-3db2-4c35-8fe8-ff4962977f22', description: 'L\'id de l\'utilisateur connecté' })
    user_id: number

    @Column({ type: 'timestamp' })
    @ApiProperty({ description: 'Heure de début de la séance' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    @ApiProperty({ description: 'Heure de début de la séance' })
    end_time: Date;

    @ManyToOne(() => User, (user) => user.reservations, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}