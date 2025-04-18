"use client";
import Image from "next/image";
// import { Button } from "src/components/ui/button";
// import { Card, CardContent } from "src/components/ui/card";
// import { auth, signIn } from "~/server/auth";
// import { api } from "~/trpc/server";
// import { FeatureBox } from "src/components/ui/featurebox";
// import { CarouselFeatureBox } from "src/components/ui/carouselfeaturebox";
import { Navbar } from "~/components/Navbar";
// import { Footer } from "~/components/ui/footer";
import Link from "next/link";
import { useState } from "react";
import { NoHackathonView } from "src/components/no-hackathon-view";
import { SponsorSideBar } from "src/components/sponsorsidebar";
import SponsorshipDashboardClient from "src/components/sponsorshipdashboardclient";

export default function SponsorDashboard() {  
    // we'll pull these from database lol

    const [companyName, setCompanyName] = useState("Microsoft");

    const [companyMissionStatement, setCompanyMissionStatement] = useState("Our mission is to empower every person and every organization on the planet to achieve more.");

    // const [companyProfilePictureURL, setCompanyProfilePictureURL] = useState("/images/resources.JPG");
    const [companyPhotoURL, setCompanyPhotoURL] = useState("/images/Microsoft.png");

    const [companyDescription, setCompanyDescription] = useState(" We develop and market software, services, and hardware devices that deliver new opportunities and enhanced value to people's lives ");
    const [companyLocation, setCompanyLocation] = useState("Redmond, WA");
    const [employeeCount, setEmployeeCount] = useState(228000);


    const [companyContacts, setCompanyContacts] = useState("Phone: 1-800-MICROSOFT"); // would be []
 
    const [companySites, setCompanySites] = useState("www.microsoft.com/en-us/");

    // pull contact info struct list 
    // pull focus area struct list
    // pull site list 

    return (
        <div className="flex min-h-screen flex-col bg-[#1A1B2E]">
            <Navbar />
            <main className="flex flex-grow flex-row">

                <SponsorSideBar
                    sponsorName={`${companyName} Dashboard`}
                    sponsorImage={companyPhotoURL}
                    
                />
                {/* <NoHackathonView/> */}
                <SponsorshipDashboardClient
                    companyMissionStatement={companyMissionStatement}
                    companySites={companySites}
                    companyContacts={companyContacts}
                    companyPhotoURL={companyPhotoURL}
                    companyDescription={companyDescription}
                    companyLocation={companyLocation}
                    employeeCount={employeeCount}
                />
            
                

            </main>

        </div>

    );

}
