'use client'

import { PSUDataTable } from "@/components/psu-data-table"
import { SimpleDataTable } from "@/components/simple-data-table"
import { SortableDataTable } from "@/components/sortable-data-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePageTitle } from "@/context"
import { useEffect } from "react"

export default function Page() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Tables");
  }, [setTitle]);

  return (
        <div className="lg:px-4 xl:px-32">
          <Tabs
            defaultValue="simple"
            className="flex flex-1 flex-col gap-4 p-4 pt-0 mx-auto xxxl:mx-0"
            style={{ height: 'calc(var(--app-height) - 4rem)' }}
          >
            <TabsList className="grid auto-rows-min gap-4 md:grid-cols-4 w-full p-2">
              <TabsTrigger value="simple" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Simple Tables
              </TabsTrigger>
              <TabsTrigger value="sort" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80  dark:bg-muted/50">
                Sortable Tables
              </TabsTrigger>
              <TabsTrigger value="filter" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Filtered Tables
              </TabsTrigger>
              <TabsTrigger value="advanced" className="w-full max-h-[100px] md:min-h-[100px] rounded-xl bg-muted/80 dark:bg-muted/50">
                Advanced Tables
              </TabsTrigger>
            </TabsList>
            <TabsContent value="simple" className="flex flex-col flex-1 overflow-hidden rounded-xl">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <SimpleDataTable />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="sort" className="flex-1 rounded-xl md:min-h-min">
              <SortableDataTable />
            </TabsContent>
            <TabsContent value="filter" className="flex-1 rounded-xl md:min-h-min">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <PSUDataTable />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="advanced" className="flex-1 rounded-xl md:min-h-min">
              <ScrollArea className="h-[calc(var(--app-height)-4rem-18.01rem)] w-full">
                <PSUDataTable />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
  )
}