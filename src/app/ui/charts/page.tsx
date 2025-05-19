'use client'

import { PSUAreaTrend, PSULineTrend, PSUTrend } from "@/components/psus-trend-chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YTDTrend } from "@/components/ytd-trends-chart"
import { usePageTitle } from "@/context"
import { useEffect } from "react"

export default function Page() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Charts");
  }, [setTitle]);

  return (
        <div className="lg:px-4 xl:px-32">
          <Tabs
            defaultValue="bar"
            className="flex flex-1 flex-col gap-4 p-4 pt-0 mx-auto xxxl:mx-0"
            style={{ height: 'calc(var(--app-height) - 4rem)' }}
          >
            <TabsList className="grid auto-rows-min gap-4 md:grid-cols-4 w-full p-2">
              <TabsTrigger value="bar" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Bar Charts
              </TabsTrigger>
              <TabsTrigger value="line" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Line Charts
              </TabsTrigger>
              <TabsTrigger value="area" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Area Charts
              </TabsTrigger>
              <TabsTrigger value="combined" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Combined Charts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bar" className="flex flex-col flex-1 overflow-hidden rounded-xl">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <PSUTrend />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="combined" className="flex-1 rounded-xl md:min-h-min">
              <YTDTrend />
            </TabsContent>
            <TabsContent value="line" className="flex-1 rounded-xl md:min-h-min">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <PSULineTrend />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="area" className="flex-1 rounded-xl md:min-h-min">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <PSUAreaTrend />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
  )
}