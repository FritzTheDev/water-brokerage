import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Listing } from "./listing.entity";
import { User } from "./user.entity";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  public id: string;

  @CreateDateColumn("date")
  public createdDate: Date;

  @Column("integer")
  public offerPrice: Number;

  @Column("integer")
  public requestedVolume: Number;

  @Column("date")
  public availableDate: Date;

  @ManyToOne(
    () => WestlandsAccount,
    (westlandsAccount: WestlandsAccount) => westlandsAccount.offers
  )
  public westlandsAccount: WestlandsAccount;

  @ManyToOne(
    () => Listing,
    (listing: Listing) => listing.offers
  )
  public listing: Listing;

  @ManyToOne(
    () => User,
    (user: User) => user.offers
  )
  public owner: User;
}