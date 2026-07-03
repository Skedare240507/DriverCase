import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message");
      return;
    }
    setLoading(true);
    try {
      await api.submitInquiry(form);
      toast.success("Inquiry received — we'll respond shortly.");
      setDone(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="bg-[#050505] text-white min-h-screen">
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="overline">Contact · Get in touch</div>
          <h1 className="mt-6 font-display text-[13vw] md:text-[8vw] leading-[0.85] tracking-tighter">
            Say <span className="italic text-[#D4AF37]">hello.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70 leading-relaxed">
            Want a marque added? A correction to file? A story you'd like told?
            Send us a note — we read every one.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4 space-y-6">
            {[
              {
                icon: <MapPin size={16} />,
                label: "Studio",
                value: "24.9152° N · 10.9160° E",
                sub: "Somewhere between Maranello and Molsheim",
              },
              {
                icon: <Mail size={16} />,
                label: "Editorial",
                value: "hello@velocity-atlas.io",
                sub: "For press and marque nominations",
              },
              {
                icon: <Phone size={16} />,
                label: "Direct",
                value: "+1 (415) 000 0000",
                sub: "Voicemail only — leave a story",
              },
            ].map((c) => (
              <div key={c.label} className="glass p-6">
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  {c.icon}
                  <span className="overline text-[#D4AF37]">{c.label}</span>
                </div>
                <div className="mt-3 font-display text-2xl">{c.value}</div>
                <p className="mt-2 text-white/60 text-sm">{c.sub}</p>
              </div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={submit}
            data-testid="contact-form"
            className="col-span-12 md:col-span-8 glass p-8 md:p-10"
          >
            {done ? (
              <div className="py-16 text-center">
                <div className="overline text-[#D4AF37]">Message received</div>
                <h3 className="font-display text-4xl mt-3">Thank you.</h3>
                <p className="mt-4 text-white/70">
                  We've logged your inquiry. Expect a reply within two business days.
                </p>
                <button
                  data-testid="send-another"
                  onClick={() => setDone(false)}
                  className="btn-outline mt-8"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="overline block mb-2">Name</label>
                    <input
                      data-testid="contact-name"
                      value={form.name}
                      onChange={onChange("name")}
                      required
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] py-3 outline-none font-body text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="overline block mb-2">Email</label>
                    <input
                      data-testid="contact-email"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      required
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] py-3 outline-none font-body text-lg"
                      placeholder="you@atlas.co"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="overline block mb-2">Subject</label>
                  <input
                    data-testid="contact-subject"
                    value={form.subject}
                    onChange={onChange("subject")}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] py-3 outline-none font-body text-lg"
                    placeholder="Marque nomination · press · other"
                  />
                </div>

                <div className="mt-8">
                  <label className="overline block mb-2">Message</label>
                  <textarea
                    data-testid="contact-message"
                    value={form.message}
                    onChange={onChange("message")}
                    required
                    rows={6}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] py-3 outline-none font-body text-lg resize-none"
                    placeholder="Tell us the story…"
                  />
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                    We reply within 48 hours
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit"
                    className="btn-solid disabled:opacity-50"
                  >
                    {loading ? "Sending…" : "Send Message"} <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
