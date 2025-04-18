import Image from "next/image";
import React from "react";

interface props {
    companyDescription: string;
    companyLocation: string;
    employeeCount: number;
    companyMissionStatement: string;
    companyPhotoURL: string;
    companyContacts: string;
    companySites: string;
}

{/* whoops */}
// this is such a mess oh my god
// im so sorry to whoever cleans this shit up 
export default function SponsorshipDashboardClient({ companyMissionStatement, companySites, companyContacts, companyPhotoURL, companyDescription, companyLocation, employeeCount }: props) {  
    return (
        <div className="flex flex-col w-9/12 m-5">
        <div className="bg-white/5 rounded-xl p-6 border  border-white/10">
            <div className="text-[#59BC89] font-bold my-2">Sponsor Dashboard</div>
            <Image
                className="object-cover h-[40vh] w-full rounded-xl"
                src={companyPhotoURL}
                width={2000}
                height={2000}
                alt="title"
            />
            
        </div>

        <div className="text-[#59BC89] my-8 text-lg font-bold justify-center align-middle items-center flex">{companyMissionStatement}</div>

        <div className="flex flex-wrap  align-middle justify-center gap-x-4 gap-y-4">
                <div className="bg-white/5 rounded-xl p-6 border  border-white/10 h-[35vh] w-[35vh]">
                    <div className="text-[#59BC89] font-bold">Overview</div>
                    <div className="text-white ">{companyDescription}</div>
                    <div className="text-[#59BC89] font-bold">Located at {companyLocation}</div>
                    <div className="text-[#59BC89] font-bold">{employeeCount} employees</div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border  border-white/10 h-[35vh] w-[35vh]">
                    <div className="text-[#59BC89] font-bold">Focus Areas</div>
                    <div className="flex flex-wrap">
                        <div className="flex flex-wrap w-full h-full justify-center">
                            <div className="m-1 w-fit h-10 p-2 bg-[#59BC89] text-white text-small rounded-3xl">Computer Hardware</div>
                            <div className="m-1 w-fit h-10  p-2 bg-[#59BC89]  text-white text-small rounded-3xl">Cloud Computing</div>
                            <div className="m-1 w-fit h-10  p-2 bg-[#59BC89]   text-white text-small rounded-3xl">Software Development</div>
                            <div className="m-1 w-fit h-10  p-2 bg-[#59BC89] text-white text-small rounded-3xl">Consumer Electronics</div>
                        </div>

                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border  border-white/10 h-[35vh] w-[35vh]">
                    <div className="text-[#59BC89] font-bold">Contact Information</div>
                        <div className="text-white ">{ companyContacts}</div>

                        {/* {companyContacts.map( (index) => (
                            
                            <div className="hover:text-[#59BC89] text-[#DBDBF1] inline-flex h-10 w-full items-center text-sm transition-colors"></div>
                            

                        ))
                        } */}
                </div>

                <div className="bg-white/5 rounded-xl p-6 border  border-white/10 h-[35vh] w-[35vh]">
                    <div className="text-[#59BC89] font-bold">Company Sites</div> 
                        <div className="text-white ">{ companySites}</div>
                            

                        {/* {companyContacts.map( (index) => (
                            
                            <div className="hover:text-[#59BC89] text-[#DBDBF1] inline-flex h-10 w-full items-center text-sm transition-colors"></div>
                            

                        ))
                        } */}
                </div>

            </div> 

        </div>
    );
}