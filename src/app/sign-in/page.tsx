import SignInForm from "@/components/SignInForm";

export default function GeneralSignInPage() {
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>Sign in to the Alliances Platform</h1>
        <p>
          Use your Alliances test credentials to sign in. This authenticates
          against the Prisma-backed user accounts in the database.
        </p>
      </header>

      <SignInForm redirectToHomeOnSuccess />
    </section>
  );
}
