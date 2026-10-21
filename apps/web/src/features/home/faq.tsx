import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@halmahera/ui/components/accordion";

import { SectionHeading } from "@/features/profile/components/section-heading";

const questions = [
  { question: "Can it run on our own servers?", answer: "Yes." },
  {
    question: "Which AI models do you use?",
    answer: "The one that fits the job and your data rules.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We hand over the code and the docs, and we train your team. Support and maintenance are there if you want them.",
  },
  { question: "How long until we see something?", answer: "A clickable demo in 14 days." },
  { question: "How do we start?", answer: "Book a call. We pick one use case together." },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 lg:grid-cols-3 lg:gap-16">
        <SectionHeading title="Questions.">Short answers to what people ask first.</SectionHeading>
        <Accordion className="lg:col-span-2">
          {questions.map(function renderQuestion(item) {
            return (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
