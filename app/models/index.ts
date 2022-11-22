import { Model, model, models } from 'mongoose'

import { AdminInterface, AdminSchema } from './admin'
import { CategoryInterface, CategorySchema } from './category'
import { EventInterface, EventSchema } from './event'
import { FeatureInterface, FeatureSchema } from './feature'
import { ImageInterface, ImageSchema } from './image'
import { LessonInterface, LessonSchema } from './lesson'
import { MethodInterface, MethodSchema } from './method'
import { MinistryInterface, MinistrySchema } from './ministry'
import { PublicationInterface, PublicationSchema } from './publication'
import { RoleInterface, RoleSchema } from './role'
import { StaffMemberInterface, StaffMemberSchema } from './staff-member'
import { TestimonialInterface, TestimonialSchema } from './testimonial'
import { UserInterface, UserSchema } from './user'

export const Admin = models.Admin as Model<AdminInterface> || model<AdminInterface>("Admin", AdminSchema)
export const Category = models.Category as Model<CategoryInterface> || model<CategoryInterface>("Category", CategorySchema)
export const Event = models.Event as Model<EventInterface> || model<EventInterface>("Event", EventSchema)
export const Feature = models.Feature as Model<FeatureInterface> || model<FeatureInterface>("Feature", FeatureSchema)
export const Image = models.Image as Model<ImageInterface> || model<ImageInterface>("Image", ImageSchema)
export const Lesson = models.Lesson as Model<LessonInterface> || model<LessonInterface>("Lesson", LessonSchema)
export const Method = models.Method as Model<MethodInterface> || model<MethodInterface>("Method", MethodSchema)
export const Ministry = models.Ministry as Model<MinistryInterface> || model<MinistryInterface>("Ministry", MinistrySchema)
export const Publication = models.Publication as Model<PublicationInterface> || model<PublicationInterface>("Publication", PublicationSchema)
export const Role = models.Role as Model<RoleInterface> || model<RoleInterface>("Role", RoleSchema)
export const StaffMember = models.StaffMember as Model<StaffMemberInterface> || model<StaffMemberInterface>("StaffMember", StaffMemberSchema)
export const Testimonial = models.Testimonial as Model<TestimonialInterface> || model<TestimonialInterface>("Testimonial", TestimonialSchema)
export const User = models.User as Model<UserInterface> || model<UserInterface>("User", UserSchema)
