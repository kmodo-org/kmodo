import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "~/components/ui/card";

export default async function Tos() {
  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Terms of Service</CardTitle>
          <CardDescription className="text-lg">
            Last Updated: February, 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base lg:prose-lg">

          <h2>
            <p>
            Kmodo Org., a private organization in Orlando, FL (referred to as “kmodo,” “Kmodo,” “us,” or “we”) owns and operates 
            this website and any other web services or products offered by us now or in the future. By accessing, using, downloading, 
            or viewing this website through any of the URLs including [kmodo.org], or any of its services or content (defined below) 
            (collectively, the “Site”), you hereby consent and agree to these terms and conditions (“Terms of Use”). The Terms of Use and 
            Privacy Policy (collectively, the “Terms”) govern your use of the Site, use and access of other free materials and 
            resources provided by the Site, and any other services or products we make available on this Site (collectively, the “Services”). 
            These Terms constitute a legally binding agreement made by and between Kmodo and the user of this Site (personally and, if applicable, 
            on behalf of the entity for whom you are using the Site; collectively, “you”).
            </p>
          </h2>

          <h2>0. Use</h2>
          <p>
          BY ACCESSING OR USING ANY PART OF THE SITE OR SERVICES, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO BE BOUND BY THESE TERMS, 
          WHICH CONTAIN A TERMS OF SALE AGREEMENT, AN ARBITRATION AGREEMENT, A WAIVER OF CLASS-ACTION RIGHTS, AND LIABILITY LIMITATIONS.
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Kmodo. By accessing or using our website, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>

          
        </CardContent>
      </Card>
    </div>
  );
}