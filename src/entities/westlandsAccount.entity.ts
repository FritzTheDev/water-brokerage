import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Listing } from "./listing.entity";
import { Offer } from "./offer.entity";

@Entity()
export class WestlandsAccount {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public account_name: string;

  @Column()
  public account_number: string;

  @ManyToOne(
    () => User,
    (user: User) => user.westlandsAccounts
  )
  public owner: User;

  @OneToMany(
    () => Listing,
    (listing: Listing) => listing.westlandsAccount
  )
  public listings: Listing[];

  @OneToMany(
    () => Offer,
    (offer: Offer) => offer.westlandsAccount
  )
  public offers: Offer[];
}