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
import {fetchLinks, generateShortUrl} from "@/app/api/ApiRoutes";
import { Link } from "./models/LinkModel"

type CardProps = React.ComponentProps<typeof Card>

export default function CardDemo({ className, ...props }: CardProps) {

  const [longUrl, setLongUrl] = useState('');
  const [linkList, setLinks] = useState<Link[]>([]);

  const generateShortUrlHandler = async () => {
    try {
      const generatedShortUrl = await generateShortUrl(longUrl);

      if (generatedShortUrl) {
        console.log('Generated Short URL:', generatedShortUrl);
        // Reload the list of links after short URL is generated
        reloadLinks();
      }
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  const reloadLinks = async () => {
    try {
      const linksData = await fetchLinks();

      if (linksData) {
        setLinks(linksData);
        console.log('Reloaded Links:', linksData);
      }
    } catch (error) {
      console.error('Error reloading links:', error);
    }
  };

  useEffect(() => {
    // Load initial list of links when the component mounts
    reloadLinks();
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
                <Input type="text" placeholder="https://app.tinylink.in/register" value={longUrl} onChange={(e) => setLongUrl(e.target.value)}/>
                <Button type="submit" onClick={generateShortUrlHandler}>Generate</Button>
            </div>
            <div>
            {linkList.map((link, index) => (
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
                          <a href={link.urlShort} target="_blank" rel="noopener noreferrer">
                            {"tinylink.in/" + link.urlShort}
                          </a>  
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {link.urlOriginal}
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
