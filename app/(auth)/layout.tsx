import Image from "next/image";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-dvh md:h-dvh w-full flex md:flex-row flex-col-reverse items-center justify-center">
      <section className="w-full md:w-3/5  min-h-full flex items-center pl-12">
        {children}
      </section>

      <section className="w-full md:w-2/5 bg-red-400 min-h-full flex-1 relative">
        <Image
          src="/assets/login-image.png"
          alt="login-page"
          fill
          className="object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
