import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { SolutionsSection } from "@/components/solutions-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { BlogSection } from "@/components/blog-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SolutionsSection />
      <CaseStudiesSection />
      <BlogSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
