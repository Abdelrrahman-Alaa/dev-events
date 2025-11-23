import Image from "next/image";
import Link from "next/link";
interface props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={310}
        height={200}
        className="poster"
      />
      <div className="flex gap-2">
        <Image src={"icons/pin.svg"} alt="location" height={14} width={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image src={"icons/calendar.svg"} alt="date" height={14} width={14} />
          <p>{date}</p>
        </div>
        <div>
          <Image
            src={"icons/clock.svg"}
            alt="time"
            height={14}
            width={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
