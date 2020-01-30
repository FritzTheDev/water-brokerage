import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { WestlandsAccount, User, Listing } from ".";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  public id: string;

  @CreateDateColumn()
  public createdDate: Date;

  @Column()
  public offerPrice: Number;

  @Column()
  public requestedVolume: Number;

  @Column()
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