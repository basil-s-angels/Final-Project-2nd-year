"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="bg-slate-800 rounded-xl w-[50%] m-auto mt-8">
      <CardHeader>
        <CardTitle>Basil&apos;s Angels Team Members</CardTitle>
        <CardDescription>Awesome and pro coders!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4 text-sm">
          <div className="flex items-center space-x-4">
            pic
            <div>
              <p className="text-sm font-medium leading-none">
                Basil Jermanos Amso
              </p>
              <p className="text-sm text-muted-foreground">p@example.com</p>
            </div>
          </div>
          Scrum Master
        </div>
        <div className="flex items-center justify-between space-x-4 text-sm">
          <div className="flex items-center space-x-4">
            pic
            <div>
              <p className="text-sm font-medium leading-none">
                Raine Christine Perez
              </p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          Product Owner
        </div>
        <div className="flex items-center justify-between space-x-4 text-sm">
          <div className="flex items-center space-x-4">
            pic
            <div>
              <p className="text-sm font-medium leading-none">
                Chad Denard Andrada
              </p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          Developer
        </div>
        <div className="flex items-center justify-between space-x-4 text-sm">
          <div className="flex items-center space-x-4">
            pic
            <div>
              <p className="text-sm font-medium leading-none">
                Shawn Timothy Barza
              </p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          Developer
        </div>
        <div className="flex items-center justify-between space-x-4 text-sm">
          <div className="flex items-center space-x-4">
            pic
            <div>
              <p className="text-sm font-medium leading-none">
                Thelanny Maguillano
              </p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          Developer
        </div>
      </CardContent>
    </Card>
  );
}
