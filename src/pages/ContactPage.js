import { Button } from "../components/ui/button";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const ContactPage = () => {
  const { show } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    botField: "",
  });

  function validate(next) {
    const nextErrors = {};
    if (!next.name.trim()) nextErrors.name = "Name is required";

    const email = next.email.trim();
    if (!email) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email";
    }

    const msg = next.message.trim();
    if (!msg) nextErrors.message = "Message is required";
    else if (msg.length < 10) nextErrors.message = "Message must be at least 10 characters";

    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      show({
        title: "Fix form errors",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    if (values.botField) {
      // honeypot filled out => treat as spam
      show({
        title: "Submission blocked",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formName = "contact";
      const payload = new URLSearchParams({
        "form-name": formName,
        name: values.name,
        email: values.email,
        message: values.message,
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setValues({ name: "", email: "", message: "", botField: "" });
      setErrors({});

      show({
        title: "Message sent",
        description: "Thanks — we’ll get back to you soon.",
      });
    } catch (err) {
      show({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="section" id="contact">
      <div className="section-center max-w-2xl">
        <h2 className="text-center mb-8">Contact</h2>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>
          <div className="grid gap-4">
            <label>
              Name
              <input
                name="name"
                type="text"
                value={values.name}
                onChange={(e) =>
                  setValues((v) => ({ ...v, name: e.target.value }))
                }
                aria-invalid={Boolean(errors.name)}
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
              />
              {errors.name ? (
                <span className="text-sm text-red-600">{errors.name}</span>
              ) : null}
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues((v) => ({ ...v, email: e.target.value }))
                }
                aria-invalid={Boolean(errors.email)}
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
              />
              {errors.email ? (
                <span className="text-sm text-red-600">{errors.email}</span>
              ) : null}
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) =>
                  setValues((v) => ({ ...v, message: e.target.value }))
                }
                aria-invalid={Boolean(errors.message)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              />
              {errors.message ? (
                <span className="text-sm text-red-600">{errors.message}</span>
              ) : null}
            </label>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "sending..." : "send message"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
