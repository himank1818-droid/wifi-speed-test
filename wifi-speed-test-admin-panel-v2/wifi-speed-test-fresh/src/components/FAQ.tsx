import { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
  ];

  return (
    <section aria-label="Frequently asked questions" className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {t('faq.title')}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          {t('faq.subtitle')}
        </p>
      </div>

      <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <article
              key={i}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-[#00d4ff]/20 shadow-[0_0_20px_rgba(0,212,255,0.1)]' : 'border-white/5'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4 group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <h3
                  itemProp="name"
                  className={`text-base font-semibold transition-colors ${
                    isOpen ? 'text-[#00d4ff]' : 'text-white group-hover:text-[#00d4ff]/80'
                  }`}
                >
                  {faq.question}
                </h3>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#00d4ff]/20 rotate-180' : 'bg-white/5 rotate-0'
                  }`}
                >
                  <svg
                    className="w-4 h-4 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isOpen ? '#00d4ff' : '#94a3b8'}
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p itemProp="text" className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
