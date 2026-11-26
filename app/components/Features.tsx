const items = [
  {
    icon: "/Vector (2).png",
    title: "Expert Tutors",
    text: "learn from the best",
    order: "order-2 md:order-1",
  },
  {
    icon: "/Vector (1).png",
    title: "Smart Learning",
    text: "study personalized your way",
    order: "order-1 md:order-2",
  },
  {
    icon: "/Track prpgress.png",
    title: "Track progress",
    text: "achieve more every day.",
    order: "order-3",
  },
];

export default function Features() {
  return (
    <div className="relative z-10 mt-12 flex flex-col gap-4 md:absolute md:bottom-7 md:left-1/2 md:mt-0 md:-translate-x-1/2 md:flex-row md:gap-0">
      {items.map((f) => (
        <div
          key={f.title}
          className={`flex items-center gap-4 text-sm leading-tight text-black md:gap-3 md:border-l md:border-black/30 md:px-8 md:first:border-l-0 ${f.order}`}
        >
          <img
            src={f.icon}
            alt=""
            className="h-14 w-14 md:h-[60px] md:w-[60px]"
          />
          <p className="max-w-[150px]">
            <b className="font-medium">{f.title}</b>
            <br />
            {f.text}
          </p>
        </div>
      ))}
    </div>
  );
}
