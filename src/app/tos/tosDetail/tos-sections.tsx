import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

    const TosSections: React.FC = () => {
      return (
        <div className="container mx-auto p-8 bg-white">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2">Terms of Service</CardTitle>
              <CardDescription className="text-lg">Last Updated: February, 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm sm:prose-base lg:prose-lg">
              <p>
                Kmodo Org., a private organization in Orlando, FL (referred to as “kmodo,” “Kmodo,” “us,” or “we”) owns and operates
                this website and any other web services or products offered by us now or in the future. By accessing, using, downloading,
                or viewing this website through any of the URLs including [kmodo.org], or any of its services or content (defined below)
                (collectively, the “Site”), you hereby consent and agree to these terms and conditions (“Terms of Use”). The Terms of Use and
                Privacy Policy (collectively, the “Terms”) govern your use of the Site, use and access of other free materials and
                resources provided by the Site, and any other services or products we make available on this Site (collectively, the “Services”).
                These Terms constitute a legally binding agreement made by and between Kmodo and the user of this Site (personally and,
                if applicable, on behalf of the entity for whom you are using the Site; collectively, “you”).
              </p>
              <p className="mt-4">
                BY ACCESSING OR USING ANY PART OF THE SITE OR SERVICES, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO BE BOUND BY
                THESE TERMS, WHICH CONTAIN A TERMS OF SALE AGREEMENT, AN ARBITRATION AGREEMENT, A WAIVER OF CLASS-ACTION RIGHTS, AND LIABILITY
                LIMITATIONS.
              </p>
              <p className="mt-4">
                If you do not agree to these Terms and to follow all applicable laws, then please cease access or use of the Site and
                Services immediately.
              </p>
              <p className="mt-4">
                If you have any questions about these Terms, please contact us by email at{" "}
                <a href="mailto:@kmodo.org">@kmodo.org</a>.
              </p>
              <p className="mt-4">
                If you access any Kmodo Site on a social media network (such as, without limitation, Facebook, Twitter, Instagram, or Github),
                you also consent to and agree to abide by the terms and conditions of that social media network.
              </p>

              {/* Section 1 */}
              <h2 className="mt-8 text-2xl font-bold">1. Our Services</h2>
              <p>
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any
                jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any
                registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services
                from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the
                extent local laws are applicable. The Services are not tailored to comply with industry-specific regulations (Health Insurance
                Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions
                would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the
                Gramm-Leach-Bliley Act (GLBA).
              </p>

              {/* Section 2 */}
              <h2 className="mt-8 text-2xl font-bold">2. Intellectual Rights</h2>
              <p>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases,
                functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the
                "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks"). Our Content and Marks are
                protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties
                in the United States and around the world. The Content and Marks are provided in or through the Services "AS IS" for your
                personal, non-commercial use or internal business purpose only.
              </p>
              <p className="mt-4">
                Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive,
                non-transferable, revocable license to:
              </p>
              <ul>
                <li>Access the Services;</li>
                <li>
                  Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal,
                  non-commercial use or internal business purpose.
                </li>
              </ul>
              <p>
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied,
                reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold,
                licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
              <p>
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal
                Terms, please address your request to:{" "}
                <a href="mailto:admin@kmodo.org">admin@kmodo.org</a>.
              </p>
              <p>
                We reserve all rights not expressly granted to you in and to the Services, Content, and Marks. Any breach of these Intellectual
                Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
              </p>
              <p>
                <strong>Your submissions and contributions:</strong> Please review this section and the "PROHIBITED ACTIVITIES" section carefully
                prior to using our Services to understand (a) the rights you give us and (b) the obligations you have when you post or upload any
                content through the Services.
              </p>
              <p>
                <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about
                the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we
                shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or
                otherwise, without acknowledgment or compensation to you.
              </p>
              <p>
                <strong>Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards, online
                forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast
                content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs,
                music, graphics, comments, reviews, rating suggestions, personal information, or other material ("Contributions"). Any Submission
                that is publicly posted shall also be treated as a Contribution.
              </p>
              <p>
                You understand that Contributions may be viewable by other users of the Services and possibly through third-party websites. When you
                post Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free,
                fully-paid, worldwide right and license to use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store,
                publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including,
                without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative
                works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section.
              </p>
              <p>
                Our use and distribution may occur in any media formats and through any media channels. This license includes our use of your name,
                company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and
                commercial images you provide.
              </p>
              <p>
                You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses
                that we may suffer because of your breach of this section, any third party's intellectual property rights, or applicable law.
              </p>
              <p>
                We may remove or edit your Content: Although we have no obligation to monitor any Contributions, we shall have the right to remove
                or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in
                breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report
                you to the authorities.
              </p>
              <p>
                <strong>Copyright infringement:</strong> We respect the intellectual property rights of others. If you believe that any material
                available on or through the Services infringes upon any copyright you own or control, please immediately refer to the "COPYRIGHT
                INFRINGEMENTS" section below.
              </p>

              {/* Section 3 */}
              <h2 className="mt-8 text-2xl font-bold">3. User Representations</h2>
              <p>By using the Services, you represent and warrant that:</p>
              <ol>
                <li>All registration information you submit will be true, accurate, current, and complete;</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                <li>You have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li>You are not a minor in the jurisdiction in which you reside;</li>
                <li>You will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
                <li>Your use of the Services will not violate any applicable law or regulation.</li>
              </ol>
              <p>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your
                account and refuse any and all current or future use of the Services (or any portion thereof).
              </p>

              {/* Section 4 */}
              <h2 className="mt-8 text-2xl font-bold">4. User Registration</h2>
              <p>
                You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use
                of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole
                discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </p>

              {/* Section 5 */}
              <h2 className="mt-8 text-2xl font-bold">5. Prohibited Activities</h2>
              <p>
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not
                be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Services, you agree not to:</p>
              <ol>
                <li>
                  Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection,
                  compilation, database, or directory without written permission from us;
                </li>
                <li>
                  Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other
                  means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses;
                </li>
                <li>Use the Services to advertise or offer to sell goods and services;</li>
                <li>
                  Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or
                  restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein;
                </li>
                <li>Engage in unauthorized framing of or linking to the Services;</li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user
                  passwords;
                </li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct;</li>
                <li>
                  Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots,
                  or similar data gathering and extraction tools;
                </li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services;</li>
                <li>Attempt to impersonate another user or person or use the username of another user;</li>
                <li>Sell or otherwise transfer your profile;</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person;</li>
                <li>
                  Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating
                  endeavor or commercial enterprise.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      );
    };

    export default TosSections;