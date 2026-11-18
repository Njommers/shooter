import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { contactSchema } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact.functions";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Magnetic, Reveal } from "./motion";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const send = useServerFn(submitContact);
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const wa = whatsappLink(site.whatsappNumber);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Errors;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "", company: "" });
        toast.success("Message sent — Shooter will be in touch.");
      } else {
        setStatus("idle");
        toast.error(res.error);
      }
    } catch {
      setStatus("idle");
      toast.error("Your message couldn't be sent. Please try again.");
    }
  };

  const field =
    "w-full rounded-2xl border-2 border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink/40 outline-none transition-all focus:border-ink focus:shadow-pop";

  return (
    <section id="contact" className="relative overflow-hidden bg-sunset py-24 text-ink md:py-36">
      <div aria-hidden className="absolute -left-20 top-0 font-display text-[30vw] font-black leading-none text-outline-ink opacity-20">
        HELLO
      </div>
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal as="p" className="mb-6 flex items-center gap-3 font-display text-[10px] font-bold tracking-[0.3em] md:text-xs">
            <span className="h-px w-10 bg-ink" /> 05 — CONTACT
          </Reveal>
          <h2 className="font-display text-[clamp(2.3rem,5.4vw,5.8rem)] font-black leading-[0.88] tracking-[-0.04em]">
            <Reveal as="span" className="block">LET&apos;S CREATE</Reveal>
            <Reveal as="span" className="block" delay={100}>SOMETHING</Reveal>
            <Reveal as="span" className="block font-serif font-normal italic tracking-normal text-cream" delay={200}>
              unforgettable.
            </Reveal>
          </h2>
          <Reveal as="p" delay={300} className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
            Styling, collaborations, shoots or a creative idea that needs some attitude — send a message and start the
            conversation.
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 font-display text-[11px] font-bold tracking-[0.18em] text-cream transition-colors hover:bg-purple"
              >
                <InstagramIcon className="h-4 w-4" /> DM ON INSTAGRAM <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            {wa && (
              <Magnetic>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-lime px-6 py-4 font-display text-[11px] font-bold tracking-[0.18em] text-ink transition-colors hover:bg-cream"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WHATSAPP
                </a>
              </Magnetic>
            )}
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-6">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[2rem] bg-ink p-6 text-cream shadow-2xl md:p-10"
            aria-label="Contact form"
          >
            {status === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-lime text-ink">
                  <Check className="h-9 w-9" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-black uppercase">Message received</h3>
                <p className="mt-3 max-w-xs text-cream/75">Thank you. Shooter will get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-cream/30 px-6 py-3 font-display text-[11px] font-bold tracking-[0.18em] hover:bg-cream hover:text-ink"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <div className="grid gap-5">
                {(
                  [
                    { k: "name", label: "Your name", type: "text", auto: "name" },
                    { k: "email", label: "Email address", type: "email", auto: "email" },
                  ] as const
                ).map((f) => (
                  <div key={f.k}>
                    <label htmlFor={f.k} className="mb-2 block font-display text-[10px] font-bold tracking-[0.25em] text-lime">
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      id={f.k}
                      name={f.k}
                      type={f.type}
                      autoComplete={f.auto}
                      maxLength={f.k === "name" ? 100 : 255}
                      value={values[f.k]}
                      onChange={(e) => setValues((v) => ({ ...v, [f.k]: e.target.value }))}
                      aria-invalid={!!errors[f.k]}
                      aria-describedby={errors[f.k] ? `${f.k}-error` : undefined}
                      className={cn(field, errors[f.k] && "border-pink")}
                    />
                    {errors[f.k] && (
                      <p id={`${f.k}-error`} className="mt-2 text-sm text-pink">
                        {errors[f.k]}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mb-2 block font-display text-[10px] font-bold tracking-[0.25em] text-lime">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(field, "resize-none", errors.message && "border-pink")}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-pink">
                      {errors.message}
                    </p>
                  )}
                </div>
                {/* Honeypot */}
                <div className="hidden" aria-hidden>
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-orange px-8 py-5 font-display text-xs font-bold tracking-[0.2em] text-ink transition-colors hover:bg-lime disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> SENDING…
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
