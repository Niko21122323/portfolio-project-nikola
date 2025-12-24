import { div } from "framer-motion/client";

const WhatIDoSection = () => {
  const services = [
    {
      id: 1,
      title: "Development",
      subtitle: "Lorem",
      description:
        "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction.",
    },
    {
      id: 2,
      title: "Development",
      subtitle: "Lorem",
      description:
        "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction.",
    },
    {
      id: 3,
      title: "Development",
      subtitle: "Lorem",
      description:
        "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction.",
    },
  ];

  return (
    <section className="py-24">
      <div className="conainer mx-auto max-w-7xl px-6">
        <div>
          <h3 className="text-5xl text-dark/90 pb-20">
            What I Bring to the Table
          </h3>
          <div className="grid grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.id}>
                <span className="block pb-6 border-b border-dark/10">
                  {service.subtitle}
                </span>
                <h4 className="text-3xl text-dark/80 py-6">{service.title}</h4>
                <p className="text-base text-dark/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
