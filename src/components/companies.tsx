import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

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
    description: "A trusted leader in global finance, BNY Mellon supports developers building the future of fintech and investment technology.",
    activehackathons: 3
  },
  {
    id: 2,
    company: "OpenAI",
    subtitle: "Artificial Intelligence Research Organization",
    companyemail: "",
    phone: "",
    image: "/images/openAI.png",
    description: "Creators of ChatGPT and DALL·E, OpenAI is advancing safe and beneficial AI to empower developers and solve real-world challenges.",
    activehackathons: 2,
  },
  {
    id: 3,
    company: "Microsoft",
    subtitle: "Innovating for a Better Tomorrow",
    companyemail: "",
    phone: "",
    image: "/images/Microsoft.png",
    description: "Microsoft provides tools like Azure, GitHub, and Visual Studio to help developers build innovative solutions and drive global impact.",
    activehackathons: 1,
  },
];

export default function CompanyCards() {
    return (
        <div className="flex flex-wrap justify-center gap-6 pt-10">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="w-[230px] rounded-xl overflow-hidden bg-Lavender shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex items-center space-x-3">
                </div>
              </div>
      
              {/* Image */}
              {company.image && (
                <div className="w-full h-40  flex justify-center items-center mt-4">
                  <Image
                    src={company.image}
                    alt={company.company}
                    width={120}
                    height={120}
                    className="object-contain max-h-[100%]"
                  />
                </div>
              )}
      
              {/* Content */}
              <div className="px-4 py-4">
                <h3 className="text-SpaceCadet font-bold text-lg">{company.company}</h3>
                <p className="text-sm text-gray-700">{company.subtitle}</p>
                <p className="text-sm mt-2 text-SpaceCadet ">{company.description}</p>
                <p className="text-sm mt-2 text-SpaceCadet">{company.activehackathons} active hackathons</p>
      
                <div className="mt-6 flex justify-end">
                  {/* optional actions */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }