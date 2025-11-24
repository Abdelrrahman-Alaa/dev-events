import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { Event } from './event.model';

/**
 * Type definition for Booking documents
 * References Event model and includes email validation
 */
interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Email validation regex pattern (RFC 5322 simplified)
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Booking schema with email validation and event reference
 */
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => emailRegex.test(email),
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Verify that the referenced Event exists in the database
 * Throws an error if the event ID does not correspond to an existing event
 */
bookingSchema.pre<IBooking>('save', async function () {
  // Check if the referenced event exists
  const event = await Event.findById(this.eventId);

  if (!event) {
    throw new Error(
      `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
    );
  }
});

/**
 * Create or retrieve the Booking model
 * Check if model exists to avoid re-compilation errors in development
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export { Booking };
export type { IBooking };
