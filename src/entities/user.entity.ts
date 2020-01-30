import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";
import { WestlandsAccount } from "./westlandsAccount.entity";
import { Offer } from "./offer.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public fullName: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @OneToMany(
    () => WestlandsAccount,
    (westlandsAccount: WestlandsAccount) => westlandsAccount.owner
  )
  public westlandsAccounts: WestlandsAccount[];

  @OneToMany(
    () => Listing,
    (listing: Listing) => listing.owner
  )
  public listings: Listing[];

  @OneToMany(
    () => Offer,
    (offer: Offer) => offer.owner
  )
  public offers: Listing[];
}
