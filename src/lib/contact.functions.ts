import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Bots fill the hidden field; pretend success without storing anything.
    if (data.company) return { ok: true as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ name: data.name, email: data.email, message: data.message });

    if (error) {
      console.error("contact insert failed", error);
      return { ok: false as const, error: "Your message couldn't be sent. Please try again." };
    }
    return { ok: true as const };
  });
