// src/app/feedback/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Feedback – Alliances (UCL Computer Science)",
  description:
    "Help us enhance the Alliances digital experience by sharing your feedback.",
};

export default function FeedbackPage() {
  return (
    <section>
      <h1>Feedback</h1>

      <p>
        We are determined to enhance the Alliances digital experience for all of
        the partners, researchers, and students of UCL Computer Science alike.
        Please let us know how we might improve the user experience for you.
      </p>

      <h2>Feedback via GitHub</h2>
      <p>
        Have you got a GitHub account? Are you comfortable opening a{" "}
        <Link
          href="https://github.com/UCL-CS-Alliances/welcome-to-alliances/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          new issue
        </Link>{" "}
        in our site repository? If yes, please do. All feedback is welcome
        through GitHub issues.
      </p>

      <h2>Feedback via E-mail</h2>
      <p>
        Prefer a simple e-mail? Please send suggestions to{" "}
        <Link href="mailto:cs.strategicalliancesteam@ucl.ac.uk">
          cs.strategicalliancesteam@ucl.ac.uk
        </Link>
        .
      </p>
    </section>
  );
}
