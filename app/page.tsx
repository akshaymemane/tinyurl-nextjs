"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect, useState } from "react"
import {fetchLinks} from "@/lib/api";

const links:Link[] = [
  {
    shortUrl: "tinylink.in/try",
    longUrl: "https://tinylink.in/register",
    clickCount:10,
    logo:""
  },
  {
    shortUrl: "tinylink.in/UygsAG9",
    longUrl: "https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-activity-7149078423095672833-jvv4?utm_source=share&utm_medium=member_desktop",
    clickCount:25,
    logo:""
  },
  {
    shortUrl: "tinylink.in/71SLcZH",
    longUrl: "https://stackoverflow.com/questions/69220042/npm-err-unsupported-url-type-workspace-workspace",
    clickCount:50,
    logo:""
  },
]

type CardProps = React.ComponentProps<typeof Card>

type Link = {
  shortUrl: string,
  longUrl: string,
  clickCount: number,
  logo: string
}

export default function CardDemo({ className, ...props }: CardProps) {

  const [linkList, setLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      const linksData = await fetchLinks();
      if (linksData) {
        setLinks(linksData);
      }
    };

    getLinks();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
        <Card className={cn("w-[480px]", className)} {...props} >
        <CardHeader>
            <CardTitle>Short Links With Superpowers</CardTitle>
            <CardDescription>tinylink is the open-source link management infrastructure for modern marketing teams.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="https://app.tinylink.in/register" />
                <Button type="submit">Generate</Button>
            </div>
            <div>
            {links.map((link, index) => (
                <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 gap-4"
                >
                    <Avatar>
                        <AvatarImage src="/avatars/02.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="truncate space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {link.shortUrl}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {link.longUrl}
                        </p>
                    </div>
                </div>
            ))}
            <div className="mb-4 grid grid-cols-[40px_1fr] items-start pb-4 last:mb-0 last:pb-0 gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-3 w-[180px]" />
                    <Skeleton className="h-3 w-[300px]" />
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
