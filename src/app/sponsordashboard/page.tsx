"use client";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { auth, signIn } from "~/server/auth";
import { api } from "~/trpc/server";
import { FeatureBox } from "src/components/ui/featurebox";
import { CarouselFeatureBox } from "src/components/ui/carouselfeaturebox";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";
import Link from "next/link";
import { useState } from "react";

const dashboardRoutes: { title: string; href: string }[] = [
    { title: "DASHBOARD", href: "/" },
    { title: "RANKED", href: "/" },
    { title: "RESOURCES", href: "/"},
    { title: "EVENTS", href: "/"},
    { title: "COMPANIES", href: "/"},
    { title: "SETTINGS", href: "/"}
];
  

export default function SponsorDashboard() {  
    // we'll pull these from database lol
    let [companyName, setCompanyName] = useState("");

    let [companyMissionStatement, setCompanyMissionStatement] = useState("");

    let [companyProfilePictureURL, setCompanyProfilePictureURL] = useState("/images/resources.JPG");
    let [companyPhotoURL, setCompanyPhotoURL] = useState("/images/resources.JPG");

    let [companyDescription, setCompanyDescription] = useState("");
    let [companyLocation, setCompanyLocation] = useState("");
    let [employeeCount, setEmployeeCount] = useState(0);

    let [companyContacts, setCompanyContacts] = useState([]);

    let [companySites, setCompanySites] = useState([]);

    // pull contact info struct list 
    // pull focus area struct list
    // pull site list 

    return (
        <div className="flex min-h-screen flex-col bg-[#2d2647]">
            <Navbar />
            <main className="flex flex-grow flex-row">
                {/* left lol */}
                <div className="flex flex-col w-1/6 pl-7 align-middle items-center">
                    <Image
                        className="rounded-full object-cover h-[27vh] w-[27vh]]"
                        src={companyProfilePictureURL}
                        width={2000}
                        height={2000}
                        alt="title"
                    />

                    
                    <div className="flex text-[#59BC89] font-bold justify-center items-center my-3 align-middle">Welcome back {companyName}!</div>
                    
                    <div className="my-3"></div>

                    <div className="flex flex-col">
                        {dashboardRoutes.map( (route, index) => (
                            <Link
                            key={index}
                            href={route.href}
                            className="hover:text-[#59BC89] text-[#DBDBF1] inline-flex h-10 w-full items-center text-sm transition-colors">
                            {route.title}
                            </Link>

                        ))
                        }

                    </div>

                </div>
                {/* border thing uhhh */}
                <div className="ml-8 mr-3 w-fit h-[200vh] p-[0.8] bg-[#DBDBF1]"></div>

                {/* right lol */}
                <div className="flex flex-col w-9/12 m-5">
                    <div className="bg-[#32324e]  p-7 w-full rounded-2xl">
                        <div className="text-[#DBDBF1] font-bold my-2">Sponsor Dashboard</div>
                        <Image
                            className="object-cover h-[40vh] w-full rounded-xl"
                            src={companyPhotoURL}
                            width={2000}
                            height={2000}
                            alt="title"
                        />
                        
                    </div>

                    <div className="text-[#DBDBF1] my-2">{companyMissionStatement}</div>

                    <div className="flex flex-wrap  align-middle justify-center">
                            <div className="bg-[#32324e] w-[70vh] h-[70vh] rounded-2xl p-8 m-3">
                                <div className="text-[#DBDBF1] font-bold">Overview</div>
                                <div className="text-[#DBDBF1] ">{companyDescription}</div>
                                <div className="text-[#DBDBF1] ">{companyLocation}</div>
                                <div className="text-[#DBDBF1] ">{employeeCount} employees</div>
                            </div>

                            <div className="bg-[#32324e] w-[70vh] h-[70vh] rounded-2xl p-8 m-3">
                                <div className="text-[#DBDBF1] font-bold">Focus Areas</div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-wrap w-full h-full justify-center">
                                        <div className="m-3 w-[40%] h-[40%] aspect-square p-5 bg-[#59BC89] rounded-3xl"></div>
                                        <div className="m-3 w-[40%] h-[40%] aspect-square p-5 bg-[#59BC89] rounded-3xl"></div>
                                        <div className="m-3 w-[40%] h-[40%] aspect-square p-5 bg-[#59BC89] rounded-3xl"></div>
                                        <div className="m-3 w-[40%] h-[40%] aspect-square p-5 bg-[#59BC89] rounded-3xl"></div>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-[#32324e] w-[70vh] h-[70vh] rounded-2xl p-8 m-3">
                                <div className="text-[#DBDBF1] font-bold">Contact Information</div>
                                    {companyContacts.map( (index) => (
                                        
                                        <div className="hover:text-[#59BC89] text-[#DBDBF1] inline-flex h-10 w-full items-center text-sm transition-colors"></div>
                                        

                                    ))
                                    }
                            </div>

                            <div className="bg-[#32324e] w-[70vh] h-[70vh] rounded-2xl p-8 m-3">
                                <div className="text-[#DBDBF1] font-bold">Company Sites</div>
                                    {companyContacts.map( (index) => (
                                        
                                        <div className="hover:text-[#59BC89] text-[#DBDBF1] inline-flex h-10 w-full items-center text-sm transition-colors"></div>
                                        

                                    ))
                                    }
                            </div>

                        </div> 
                    
                </div>

            </main>

        </div>

    );

}
