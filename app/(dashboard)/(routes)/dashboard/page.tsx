'use client'

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MailPlus, MessageSquare, Music, MessageCircleQuestion, Podcast } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TypewriterComponent from "typewriter-effect";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "Email Composer",
    icon: MailPlus,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    href: "/email",
  },
  {
    label: "Quiz Generator",
    icon: MessageCircleQuestion,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    href: "/quiz",
  },
  {
    label: "Podcast Condensor",
    icon: Podcast,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    href: "/podcast",
  },
]

export default function DashboardPage() {
  const router = useRouter();
  const [conversationEnter, setConversationEnter] = useState<boolean>(false)
  const [imageEnter, setImageEnter] = useState<boolean>(false)
  const [codeEnter, setCodeEnter] = useState<boolean>(false)
  const [quizEnter, setQuizEnter] = useState<boolean>(false)
  const [emailEnter, setEmailEnter] = useState<boolean>(false)
  const [podcastEnter, setPodcastEnter] = useState<boolean>(false)
  const [musicEnter, setMusicEnter] = useState<boolean>(false)
  return (
    <div className="">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold md:text-4xl text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      {/* <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          tools.map((tool) => (
            <Card
              onClick={() => {
                router.push(tool.href); 
              }}
              key={tool.href}
              className="p-4 border-black/5 hover:shadow-md transition flex flex-row items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("h-8 w-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))
        }
      </div> */}
      <div className="w-[90%] custom-gradient mx-auto rounded-[12px]">
        <div className="w-full h-[650px] grid grid-cols-12 grid-rows-8 gap-4 p-4">
          <Link
            onMouseEnter={() => {
              setImageEnter(true)
            }}
            onMouseLeave={() => {
              setImageEnter(false)
            }}
            href={'/image'} className="relative row-span-5 col-span-3 bg-white ">
            <img className="w-full h-full object-cover object-center filter brightness-90 hover:brightness-100 duration-300 cursor-pointer" src="./image.jpg" alt="" />
            <div className="absolute text-[53px] bottom-[100px] font-semibold opacity:80 text-white">
              {imageEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Generate Images"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setEmailEnter(true)
          }}
            onMouseLeave={() => {
              setEmailEnter(false)
            }} href={'/email'} className="row-span-2 col-span-6 relative flex flex-col items-center justify-center cursor-pointer">
            <img className="w-full h-full object-cover object-center filter brightness-50 hover:brightness-75 duration-300 cursor-pointer" src="./email.jpg" alt="" />
            <div className="absolute text-[63px] font-semibold opacity:80 text-white">
              {emailEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Compose Email"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setMusicEnter(true)
          }}
            onMouseLeave={() => {
              setMusicEnter(false)
            }} href={'/music'} className="row-span-3 col-span-3 relative">
            <img className="w-full h-full object-cover object-center filter brightness-60 hover:brightness-90 duration-300 cursor-pointer" src="./music.jpg" alt="" />
            <div className="absolute text-[40px] opacity:80 text-white top-1 left-2">
              {musicEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Generate Music"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setQuizEnter(true)
          }}
            onMouseLeave={() => {
              setQuizEnter(false)
            }} href={'/quiz'} className={cn("relative row-span-4 col-span-6 flex flex-col items-center justify-center")}>
            <img className="w-full h-full object-cover filter brightness-50 hover:brightness-75 duration-300 cursor-pointer" src="./quiz.jpg" alt="" />
            <div className="absolute text-[73px] font-semibold opacity:80 text-white">
              {quizEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Take a Quiz"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setPodcastEnter(true)
          }}
            onMouseLeave={() => {
              setPodcastEnter(false)
            }} href={'/podcast'} className="relative row-start-6 row-end-9 col-span-3 bg-white">
            <img className="w-full h-full object-cover object-top filter brightness-70 hover:brightness-90 duration-300 cursor-pointer" src="./podcast.jpg" alt="" />
            <div className="absolute text-[43px] bottom-2 left-2 font-semibold opacity:80 text-white">
              {podcastEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Summarize Podcast"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setConversationEnter(true)
          }}
            onMouseLeave={() => {
              setConversationEnter(false)
            }} href={'/conversation'} className="col-span-6 row-span-2 bg-white relative">
            <img className="w-full h-full object-cover object-center filter brightness-70 hover:brightness-90 duration-300 cursor-pointer" src="./conversation.jpg" alt="" />
            <div className="absolute text-[63px] bottom-8 right-[90px] font-semibold opacity:80 text-white">
              {conversationEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Chat"
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>

          <Link onMouseEnter={() => {
            setCodeEnter(true)
          }}
            onMouseLeave={() => {
              setCodeEnter(false)
            }} href={'/code'} className="row-start-4 relative row-span-5 col-start-10  col-span-3 bg-white">
            <img className="w-full h-full object-cover object-center filter brightness-80 hover:brightness-100 duration-300 cursor-pointer" src="./cod.jpg" alt="" />
            <div className="absolute text-[45px] top-2 left-2 font-semibold opacity:80 text-white">
              {codeEnter && <TypewriterComponent
                options={{
                  strings: [
                    "Generate Code.",
                    "Clean.",
                    "Optimized."
                  ],
                  autoStart: true,
                  loop: true
                }}
              />}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
