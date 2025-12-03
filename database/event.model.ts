import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Type definition for Event documents
 * Extends Document to include MongoDB fields like _id and timestamps
 */
interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "Online" | "Offline" | "Hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event schema with validation and auto-generation of slug and timestamps
 */
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Event image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: [true, "Event mode is required"],
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: (agenda: string[]) => agenda.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: (tags: string[]) => tags.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Generate URL-friendly slug from title and normalize date/time formats
 * - Only regenerates slug if title is modified
 * - Normalizes date to ISO format
 * - Ensures time is in consistent HH:mm format
 */
eventSchema.pre<IEvent>("save", async function () {
  // Generate slug only if title is modified or slug doesn't exist
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.date) {
    const dateObj = new Date(this.date);
    if (!isNaN(dateObj.getTime())) {
      this.date = dateObj.toISOString().split("T")[0];
    }
  }

  // Normalize time to HH:mm format
  if (this.time) {
    const timeMatch = this.time.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
    if (timeMatch) {
      const hours = String(parseInt(timeMatch[1], 10)).padStart(2, "0");
      const minutes = timeMatch[2];
      this.time = `${hours}:${minutes}`;
    }
  }
});

/**
 * Create or retrieve the Event model
 * Check if model exists to avoid re-compilation errors in development
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export { Event };
export type { IEvent };
