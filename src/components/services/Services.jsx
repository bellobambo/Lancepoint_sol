const Services = () => {
    const services = [
      {
        id: 1,
        icon: (
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        ),
        title: "On and Off Ramping Solutions",
        description: "We handle seamless transactions between cryptocurrencies and traditional currency, whether you're client funding gigs in crypto or a freelancer withdrawing in your local currency, we've got you covered."
      },
      {
        id: 2,
        icon: (
          <div className="bg-indigo-500 text-white p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        ),
        title: "AI Enabled Review Process",
        description: "Lancepoint's AI evaluates freelancer submissions using your original agreement as the benchmark. It checks quality, completeness, and relevance—streamlining approvals and protecting both parties' expectations."
      },
      {
        id: 3,
        icon: (
          <div className="bg-purple-500 text-white p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        ),
        title: "Cross-Chain Payment Solutions",
        description: "With Lancepoint's Cross-Chain Payment system (powered by wormhole), freelancers and clients can be paid on any blockchain network. Pay or get paid in the asset you prefer, without the hassle of manual conversions."
      }
    ];
  
    return (
      <div className="py-16">
        <h2 className="text-[30px] sm:text-[39px] font-bold text-center mb-12">Services & Technologies</h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-[16px]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Services;
  