import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { User, WestlandsAccount, Offer } from ".";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  public id: string;

  @CreateDateColumn()
  public created: Date;

  @Column()
  public askingPrice: number;

  @Column()
  public totalVolume: number;

  @Column()
  public minimumVolume: number;

  @Column()
  public availableDate: Date;

  @ManyToOne(
    () => User,
    (user: User) => user.listings
  )
  public owner: User;

  @ManyToOne(
    () => WestlandsAccount,
    (westlandsAccount: WestlandsAccount) => westlandsAccount.listings
  )
  public westlandsAccount: WestlandsAccount;

  @OneToMany(
    () => Offer,
    (offer: Offer) => offer.listing
  )
  public offers: Offer[];
}
