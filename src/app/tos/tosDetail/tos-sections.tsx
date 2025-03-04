import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "~/components/ui/card";

const TosSections: React.FC = () => {
  return (
    <div className=" bg-gray-50 py-10 px-4">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
        <CardHeader className="bg-white border-b px-6 py-4">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Please read and check the box below
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-8 overflow-y-auto max-h-[600px]">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <p>
              Kmodo Org., a private organization in Orlando, FL (referred to as &ldquo;kmodo,&rdquo; &ldquo;Kmodo,&rdquo; &ldquo;us,&rdquo; or &ldquo;we&rdquo;) owns and operates
              this website and any other web services or products offered by us now or in the future. By accessing, using, downloading,
              or viewing this website through any of the URLs including [kmodo.org], or any of its services or content (defined below)
              (collectively, the &ldquo;Site&rdquo;), you hereby consent and agree to these terms and conditions (&ldquo;Terms of Use&rdquo;). The Terms of Use
              and Privacy Policy (collectively, the &ldquo;Terms&rdquo;) govern your use of the Site, use and access of other free materials and
              resources provided by the Site, and any other services or products we make available on this Site (collectively, the &ldquo;Services&rdquo;).
              These Terms constitute a legally binding agreement made by and between Kmodo and the user of this Site (personally and,
              if applicable, on behalf of the entity for whom you are using the Site; collectively, &ldquo;you&rdquo;).
            </p>
            <p className="mt-4">
              BY ACCESSING OR USING ANY PART OF THE SITE OR SERVICES, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO BE BOUND BY
              THESE TERMS, WHICH CONTAIN A TERMS OF SALE AGREEMENT, AN ARBITRATION AGREEMENT, A WAIVER OF CLASS-ACTION RIGHTS, AND LIABILITY
              LIMITATIONS.
            </p>
            <p className="mt-4">
              If you do not agree to these Terms and to follow all applicable laws, then please cease access or use of the Site and Services
              immediately.
            </p>
            <p className="mt-4">
              If you have any questions about these Terms, please contact us by email at{" "}
              <a className="text-blue-600 hover:underline" href="mailto:admin@kmodo.org">admin@kmodo.org</a>.
            </p>
            <p className="mt-4">
              If you access any Kmodo Site on a social media network (such as, without limitation, Facebook, Twitter, Instagram, or Github),
              you also consent to and agree to abide by the terms and conditions of that social media network.
            </p>
            <h2 className="mt-8 text-2xl font-bold">1. Our Services</h2>
            <p>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any
              jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any
              registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from
              other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent
              local laws are applicable. The Services are not tailored to comply with industry-specific regulations (Health Insurance
              Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions
              would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the
              Gramm-Leach-Bliley Act (GLBA).
            </p>
            <h2 className="mt-8 text-2xl font-bold">2. Intellectual Rights</h2>
            <p>
              We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases,
              functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &ldquo;Content&ldquo;),
              as well as the trademarks, service marks, and logos contained therein (the &ldquo;Marks&ldquo;). Our Content and Marks are protected by
              copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the
              United States and around the world. The Content and Marks are provided in or through the Services &ldquo;AS IS&ldquo; for your personal,
              non-commercial use or internal business purpose only.
            </p>
            <p className="mt-4">
              Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a
              non-exclusive, non-transferable, revocable license to:
            </p>
            <ul>
              <li>Access the Services;</li>
              <li>
                Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal,
                non-commercial use or internal business purpose.
              </li>
            </ul>
            <p>
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be
              copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted,
              distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior
              written permission.
            </p>
            <p>
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our
              Legal Terms, please address your request to:{" "}
              <a className="text-blue-600 hover:underline" href="mailto:admin@kmodo.org">admin@kmodo.org</a>.
            </p>
            <p>
              We reserve all rights not expressly granted to you in and to the Services, Content, and Marks. Any breach of these Intellectual
              Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate
              immediately.
            </p>
            <p>
              <strong>Your submissions and contributions:</strong> Please review this section and the &quot;PROHIBITED ACTIVITIES&quot; section carefully
              prior to using our Services to understand (a) the rights you give us and (b) the obligations you have when you post or upload
              any content through the Services.
            </p>
            <p>
              <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information
              about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree
              that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial
              or otherwise, without acknowledgment or compensation to you.
            </p>
            <p>
              <strong>Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards,
              online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or
              broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio,
              photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material (&quot;Contributions&quot;).
              Any Submission that is publicly posted shall also be treated as a Contribution.
            </p>
            <p>
              You understand that Contributions may be viewable by other users of the Services and possibly through third-party websites.
              When you post Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable,
              royalty-free, fully-paid, worldwide right and license to use, copy, reproduce, distribute, sell, resell, publish, broadcast,
              retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your
              Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or
              otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the
              licenses granted in this section.
            </p>
            <p>
              Our use and distribution may occur in any media formats and through any media channels. This license includes our use of
              your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos,
              and personal and commercial images you provide.
            </p>
            <p>
              You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and
              all losses that we may suffer because of your breach of this section, any third party&apos;s intellectual property rights,
              or applicable law.
            </p>
            <p>
              We may remove or edit your Content: Although we have no obligation to monitor any Contributions, we shall have the right to
              remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions
              harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your
              account and report you to the authorities.
            </p>
            <p>
              <strong>Copyright infringement:</strong> We respect the intellectual property rights of others. If you believe that any
              material available on or through the Services infringes upon any copyright you own or control, please immediately refer
              to the &quot;COPYRIGHT INFRINGEMENTS&quot; section below.
            </p>
            <h2 className="mt-8 text-2xl font-bold">3. User Representations</h2>
            <p>By using the Services, you represent and warrant that:</p>
            <ol className="list-decimal ml-6">
              <li>All registration information you submit will be true, accurate, current, and complete;</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
              <li>You have the legal capacity and you agree to comply with these Legal Terms;</li>
              <li>You are not a minor in the jurisdiction in which you reside;</li>
              <li>You will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
              <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
              <li>Your use of the Services will not violate any applicable law or regulation.</li>
            </ol>
            <p>
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate
              your account and refuse any and all current or future use of the Services (or any portion thereof).
            </p>
            <h2 className="mt-8 text-2xl font-bold">4. User Registration</h2>
            <p>
              You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for
              all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine,
              in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
            <h2 className="mt-8 text-2xl font-bold">5. Prohibited Activities</h2>
            <p>
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services
              may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>As a user of the Services, you agree not to:</p>
            <ol className="list-decimal ml-6">
              <li>
                Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection,
                compilation, database, or directory without written permission from us;
              </li>
              <li>
                Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or
                other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false
                pretenses;
              </li>
              <li>Use the Services to advertise or offer to sell goods and services;</li>
              <li>
                Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent
                or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained
                therein;
              </li>
              <li>Engage in unauthorized framing of or linking to the Services;</li>
              <li>
                Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as
                user passwords;
              </li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct;</li>
              <li>
                Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining,
                robots, or similar data gathering and extraction tools;
              </li>
              <li>
                Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services;
              </li>
              <li>Attempt to impersonate another user or person or use the username of another user;</li>
              <li>Sell or otherwise transfer your profile;</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person;</li>
              <li>
                Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any
                revenue-generating endeavor or commercial enterprise.
              </li>
            </ol>
            <h2 className="mt-8 text-2xl font-bold">6. Indemnification</h2>
            <p>
              You hereby agree to indemnify, defend and hold Kmodo and all of our officers, directors,
              managers, members, employees, agents, information providers, affiliates, partners, and licensors (“Kmodo Party,” or
              collectively, the “Kmodo Parties”) harmless from and against any and all liability, claims, damages, losses, costs,
              and expenses, including attorneys&apos; fees, incurred by any Kmodo Party arising from, related to, or in connection with
              (a) a violation of any provision of these Terms by you; or (b) arising from, related to, or connected with your
              violation of the rights of Kmodo or any other person or entity. We may, in our sole and absolute discretion,
              control the disposition of any such claim at your sole cost and expense. You may not settle any such claim
              without our express written consent. This defense and indemnification obligation is intended to extend to the
              fullest extent permitted by law and will survive these Terms and your use of the Site.
            </p>
            <h2 className="mt-8 text-2xl font-bold">7. Warranties and Disclaimers</h2>
            <p>
              <strong>Service Outages and Force Majeure.</strong> Unless you have greater rights in a separate signed agreement with us, we 
              disclaim to the fullest extent permitted by law any service outages that are caused by our maintenance on the servers
              or the technology that underlies our Site, failures of our service providers (including telecommunications, hosting,
              and power providers), computer viruses, natural disasters or other destruction or damage of our facilities, acts of
              nature, war, civil disturbance, or any other cause beyond our reasonable control. Under no circumstances shall Kmodo
              or its licensor or service providers be held liable for any delay or failure in performance resulting directly or
              indirectly from an event beyond its reasonable control. This provision is not intended to disclaim liability that
              Kmodo may not disclaim under law.
            </p>
            <p className="mt-4">
              USE OF SITE AND CONTENT IS AT YOUR OWN RISK. WE DO NOT WARRANT THAT OUR SITE WILL BE UNINTERRUPTED OR ERROR FREE. IN ADDITION,
               WE DO NOT MAKE ANY WARRANTY AS TO THE CONTENT ON OUR SITE. OUR SITE AND CONTENT ARE DISTRIBUTED ON AN &quot;AS IS, AS AVAILABLE&quot;
              BASIS TO THE FULLEST EXTENT PERMITTED BY LAW. ANY MATERIAL THAT YOU DOWNLOAD OR OTHERWISE OBTAIN THROUGH OUR SITE IS DONE AT YOUR OWN 
              DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY POTENTIAL DAMAGES TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS 
              FROM YOUR DOWNLOAD OF ANY SUCH MATERIAL. NEITHER WENOR ANY OF OUR AFFILIATES OR BUSINESS PARTNERS MAKES ANY WARRANTY THAT (i) OUR SITE,
               AND SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (ii) OUR SITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE, (iii) 
               THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF OUR SITE WILL BE ACCURATE OR RELIABLE, AND (iv) ANY ERRORS WILL BE CORRECTED. NEITHER 
               WE NOR ANY OF OUR AFFILIATES OR BUSINESS PARTNERS MAKE ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, 
               WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO OUR SITE, 
               ANY CONTENT, OR ANY OF OUR SERVICES, TOOLS, PRODUCTS, OR PROPERTIES. YOU EXPRESSLY AGREE THAT YOU WILL ASSUME THE ENTIRE RISK AS TO THE QUALITY 
               AND THE PERFORMANCE OF OUR SITE AND THE ACCURACY OR COMPLETENESS OF ITS CONTENT. Kmodo ASSUMES NO RESPONSIBILITY FOR AND DISCLAIMS ALL LIABILITY 
               TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW FOR ANY SUCH INACCURACIES, ERRORS OR OMISSIONS. NEITHER WE NOR OUR AFFILIATES OR BUSINESS 
               PARTNERS WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE 
               OUR SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS PROVISION IS NOT INTENDED TO DISCLAIM LIABILITY THAT Kmodo MAY 
               NOT DISCLAIM UNDER APPLICABLE LAW.
            </p>
            <h2 className="mt-8 text-2xl font-bold">8. Limitation of Liability</h2>
            <p>
              <strong>NO CONSEQUENTIAL DAMAGES.</strong> IN NO EVENT, AS PERMITTED BY THE FULLEST EXTENT OF APPLICABLE LAW, WILL Kmodo, AND Kmodo PARTIES BE LIABLE
               FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES RESULTING FROM THE PERFORMANCE, USE OF OR THE INABILITY TO USE THE SITE, SERVICES,
                CONTENT OR PRODUCTS, EVEN IF Kmodo HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING NEGLIGENCE), 
                STRICT LIABILITY, VIOLATION OF STATUTE OR OTHERWISE. THIS PROVISION IS NOT INTENDED TO EXCLUDE LIABILITY THAT Kmodo MAY NOT EXCLUDE UNDER APPLICABLE LAW.
            </p>
            <p className="mt-4">
              <strong>OUR LIABILITY IS LIMITED.</strong> IN ANY EVENT, OUR AGGREGATE LIABILITY WILL NOT EXCEED THE AMOUNT PAID FOR THE PRODUCTS TO WHICH THE CLAIM RELATES OR,
               IF THE CLAIM DOES NOT RELATE TO A PRODUCT, $100. THIS PROVISION IS NOT INTENDED TO EXCLUDE LIABILITY THAT Kmodo MAY NOT EXCLUDE UNDER APPLICABLE LAW.
            </p>
            <h2 className="mt-8 text-2xl font-bold">9. Term and Termination</h2>
            <p>
              <strong>Term.</strong> These Terms are effective unless and until terminated by you or us. We may, in our sole and absolute discretion and without any liability, 
              modify, suspend or discontinue any aspect of the Site, temporarily or permanently, at any time and without prior notice.
            </p>
            <p className="mt-4">
              <strong>Suspension and Termination.</strong> We may deny you access to all or part of the Site at any time for any reason (including if you violate these Terms, 
              as determined in our sole and absolute discretion) or no reason at all.
            </p>
            <p className="mt-4">
              <strong>Survival.</strong> If we terminate your right to access the Site, these Terms will terminate and all rights you have to access the Site will immediately terminate.
               The following provisions will survive termination: Intellectual Property, Indemnification, Payment Obligations, Warranties and Disclaimers, Limitations of Liability, 
               Dispute and any and all others that by their sense and context are intended to survive the termination or expiration of the Agreement shall survive.
            </p>
            <h2 className="mt-8 text-2xl font-bold">10. General Terms</h2>
            <p>
              <strong>No Waiver; Severability.</strong> Our failure to exercise or enforce any right or provision of these Terms will not constitute a waiver of such right 
              or provision, and our failure to exercise or enforce any right or remedy in these Terms does not waive that right or remedy. The provisions of these terms are 
              intended to extend to the fullest extent permitted by law. No waiver of any term of these Terms will be binding unless in writing.
            </p>
            <p className="mt-4">
              <strong>Statute of Limitations.</strong> You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related 
              to use of our Site or these Terms must be filed within one (1) year after such claim or cause of action arose or be forever barred.
            </p>
            <p className="mt-4">
              <strong>Applicable Law.</strong> These Terms will be construed in accordance with the laws of the United States of America and (to the extent not inconsistent with 
              or preempted by federal law) the State of New York, and the parties irrevocably consent to bring any action to enforce these Terms before an arbitration panel or 
              before a court of competent jurisdiction in New York City, NY if seeking interim or preliminary relief or enforcement of an arbitration award.
            </p>
            <p className="mt-4">
              If any part of these Terms is determined to be invalid or unenforceable pursuant to applicable law, then the invalid or unenforceable provision will be deemed superseded 
              by a valid, enforceable provision that most closely matches the intent of the original provision, and the remainder of the Terms shall continue in effect.
            </p>
            <p className="mt-4">
              <strong>Headings.</strong> The provision titles in these Terms are for convenience only and have no legal or contractual effect. These Terms will not be construed against the drafter.
            </p>
            <p className="mt-4">
              <strong>Notice.</strong> You hereby consent to receiving and transacting with us by electronic means. We may deliver notice to you by e-mail, posting a 
              notice on the Site or any other method we choose and such notice will be effective on dispatch. If you give notice to us, it will be effective when received 
              and you must use the following email address: <a className="text-blue-600 hover:underline" href="mailto:admin@kmodo.org">admin@kmodo.org</a>.
            </p>
            <p className="mt-4">
              <strong>Entire Agreement.</strong> These Terms (and all terms and conditions incorporated herein) constitute the entire agreement between you and Kmodo and 
              \govern your use of the Site and Services and supersede any prior agreements between you and Kmodo on the subject matter. You may also be subject to additional 
              terms when you use certain Kmodo third party software, content, links, or websites. These Terms, and any rights or licenses granted hereunder, may not be assigned 
              or delegated by you. These Terms, and any rights or licenses granted hereunder, may be assigned or delegated by Kmodo without restriction. These Terms bind and 
              inure to the benefit of each party and the party’s successors and permitted assigns. These Terms may not be modified by an oral statement by a representative of Kmodo.
               No agency, partnership, joint venture or employee-employer relationship is intended or created by these Terms. You agree to comply with all applicable laws in your use
                of the Site and Services. You agree that any agreements made by and between you and us in electronic form are as legally binding as if made in physical written form.
            </p>
            <p className="mt-4">
              <strong>Notice to California Users.</strong> Under California Civil Code Section 1789.3, California website users are entitled to the following specific consumer rights 
              notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 N. Market Blvd.,
               Suite S-202, Sacramento, California 95834, or by telephone at (800) 952-5210.
            </p>
            <p className="mt-4">
              <strong>Notice to Users Outside the United States of America.</strong> The Site is controlled and offered by Kmodo from the United States of America. Kmodo makes no representations
               that the Site is appropriate for use in other locations. Those who access or use the Site from other locations do so at their own risk and are responsible for compliance with local law.
                You consent to the processing in the United States of America of information you provide to us.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TosSections;
