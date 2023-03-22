import { Model, model, models } from "mongoose";

import { AdminInterface, AdminSchema } from "./admin";
import { CategoryInterface, CategorySchema } from "./category";
import { DonationInterface, DonationSchema } from "./donation";
import { EventInterface, EventSchema } from "./event";
import { FeatureInterface, FeatureSchema } from "./feature";
import { ImageInterface, ImageSchema } from "./image";
import { LessonInterface, LessonSchema } from "./lesson";
import { MemberInterface, MemberSchema } from "./member";
import { MethodInterface, MethodSchema } from "./method";
import { MinistryInterface, MinistrySchema } from "./ministry";
import { NotificationInterface, NotificationSchema } from "./notification";
import { SubscriberInterface, SubscriberSchema } from "./subscriber";
import { PublicationInterface, PublicationSchema } from "./publication";
import { RoleInterface, RoleSchema } from "./role";
import { StaffMemberInterface, StaffMemberSchema } from "./staff-member";
import { TestimonialInterface, TestimonialSchema } from "./testimonial";
import { TitheInterface, TitheSchema } from "./tithe";
import { TransactionInterface, TransactionSchema } from "./transaction";
import { UserInterface, UserSchema } from "./user";

export const Admin =
  (models.Admin as Model<AdminInterface>) ||
  model<AdminInterface>("Admin", AdminSchema);
export const Category =
  (models.Category as Model<CategoryInterface>) ||
  model<CategoryInterface>("Category", CategorySchema);
export const Donation =
  (models.Donation as Model<DonationInterface>) ||
  model<DonationInterface>("Donation", DonationSchema);
export const Event =
  (models.Event as Model<EventInterface>) ||
  model<EventInterface>("Event", EventSchema);
export const Feature =
  (models.Feature as Model<FeatureInterface>) ||
  model<FeatureInterface>("Feature", FeatureSchema);
export const Image =
  (models.Image as Model<ImageInterface>) ||
  model<ImageInterface>("Image", ImageSchema);
export const Lesson =
  (models.Lesson as Model<LessonInterface>) ||
  model<LessonInterface>("Lesson", LessonSchema);
export const Member =
  (models.Member as Model<MemberInterface>) ||
  model<MemberInterface>("Member", MemberSchema);
export const Method =
  (models.Method as Model<MethodInterface>) ||
  model<MethodInterface>("Method", MethodSchema);
export const Ministry =
  (models.Ministry as Model<MinistryInterface>) ||
  model<MinistryInterface>("Ministry", MinistrySchema);
export const Notification =
  (models.Notification as Model<NotificationInterface>) ||
  model<NotificationInterface>("Notification", NotificationSchema);
export const Subscriber =
  (models.Subscriber as Model<SubscriberInterface>) ||
  model<SubscriberInterface>("Subscriber", SubscriberSchema);
export const Publication =
  (models.Publication as Model<PublicationInterface>) ||
  model<PublicationInterface>("Publication", PublicationSchema);
export const Role =
  (models.Role as Model<RoleInterface>) ||
  model<RoleInterface>("Role", RoleSchema);
export const StaffMember =
  (models.StaffMember as Model<StaffMemberInterface>) ||
  model<StaffMemberInterface>("StaffMember", StaffMemberSchema);
export const Testimonial =
  (models.Testimonial as Model<TestimonialInterface>) ||
  model<TestimonialInterface>("Testimonial", TestimonialSchema);
export const Tithe =
  (models.Tithe as Model<TitheInterface>) ||
  model<TitheInterface>("Tithe", TitheSchema);
export const Transaction =
  (models.Transaction as Model<TransactionInterface>) ||
  model<TransactionInterface>("Transaction", TransactionSchema);
export const User =
  (models.User as Model<UserInterface>) ||
  model<UserInterface>("User", UserSchema);
