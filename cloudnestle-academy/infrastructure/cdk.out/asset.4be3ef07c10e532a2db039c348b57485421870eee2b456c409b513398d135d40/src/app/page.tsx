import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center p-8 pb-20 gap-16 sm:p-20 min-h-full w-full">
      <main className="flex flex-col gap-[32px] items-center sm:items-start w-4/5">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={240}
          height={50}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-xl text-center sm:text-left">
          <li className="mb-4 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-3 py-2 rounded text-lg">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-3 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-xl h-16 px-8 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={24}
              height={24}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-xl h-16 px-8 w-full sm:w-auto md:w-[200px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
    </div>
  );
}
