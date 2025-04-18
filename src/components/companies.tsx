import { Card } from "./ui/card";
import Image from "next/image";

type Company = {
  id: number;
  company: string;
  subtitle?: string;
  companyemail?: string;
  phone?: string;
  image?: string;
  description?: string;
  activehackathons?: number;
};

const companies: Company[] = [
  {
    id: 1,
    company: "BNY",
    subtitle: "Supporting Developers in Finance",
    companyemail: "",
    phone: "",
    image: "/images/bny.png",
    description:
      "A trusted leader in global finance, BNY Mellon supports developers building the future of fintech and investment technology.",
    activehackathons: 3,
  },
  {
    id: 2,
    company: "OpenAI",
    subtitle: "Artificial Intelligence Research Organization",
    companyemail: "",
    phone: "",
    image: "/images/openAI.png",
    description:
      "Creators of ChatGPT and DALL·E, OpenAI is advancing safe and beneficial AI to empower developers and solve real-world challenges.",
    activehackathons: 2,
  },
  {
    id: 3,
    company: "Microsoft",
    subtitle: "Innovating for a Better Tomorrow",
    companyemail: "",
    phone: "",
    image: "/images/Microsoft.png",
    description:
      "Microsoft provides tools like Azure, GitHub, and Visual Studio to help developers build innovative solutions and drive global impact.",
    activehackathons: 1,
  },
];

export default function CompanyCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6 pt-10">
      {companies.map((company) => (
        <Card
          key={company.id}
          className="w-[230px] overflow-hidden rounded-xl bg-Lavender shadow-2xl transition-all duration-300 ease-in-out hover:scale-105"
        >
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center space-x-3"></div>
          </div>

          {/* Image */}
          {company.image && (
            <div className="mt-4 flex h-40 w-full items-center justify-center">
              <Image
                src={company.image}
                alt={company.company}
                width={120}
                height={120}
                className="max-h-[100%] object-contain"
              />
            </div>
          )}

          {/* Content */}
          <div className="px-4 py-4">
            <h3 className="text-lg font-bold text-SpaceCadet">
              {company.company}
            </h3>
            <p className="text-sm text-gray-700">{company.subtitle}</p>
            <p className="mt-2 text-sm text-SpaceCadet">
              {company.description}
            </p>
            <p className="mt-2 text-sm text-SpaceCadet">
              {company.activehackathons} active hackathons
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
