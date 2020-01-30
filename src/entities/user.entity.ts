import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { WestlandsAccount, Offer, Listing } from ".";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @CreateDateColumn()
  public created: Date;

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
