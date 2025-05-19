'use client'

import { usePageTitle } from "@/context"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import LogoGroup from "@/components/tech-logo-group";
import { cn } from "@/lib/utils";
import { code } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

const dummyChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 520 },
  { name: "Mar", value: 610 },
  { name: "Apr", value: 480 },
];

const tableData = [
  { id: 1, metric: "Lookups", count: 1234 },
  { id: 2, metric: "Records", count: 987 },
  { id: 3, metric: "Errors", count: 12 },
];

const columns = [
  { accessorKey: "metric", header: "Metric" },
  { accessorKey: "count", header: "Count" },
];

export default function Page() {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { setTitle } = usePageTitle();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
      <section className="text-center space-y-4 mb-6">
        <h1 className="text-4xl font-extrabold">Jeremiah Schmid</h1>
        <p className="text-lg text-muted-foreground">
          Senior Data Analyst &amp; Full-Stack Developer
        </p>
        <LogoGroup />
      </section>
      <ScrollArea className="h-[calc(var(--app-height)-4rem-20rem)] mx-auto px-6">

        <div className="flex flex-col gap-4 w-full">

          <Accordion type="single" collapsible className="grid grid-cols-1">
            {code.map((item) => {
              const myPrismTheme = {
                ...oneDark,

                // Default text color & background
                plain: {
                  ...oneDark.plain,
                  color: theme === 'light' ? '#1F2937' : '#E5E7EB',   // Tailwind gray-800 / gray-200
                  backgroundColor: theme === 'light' ? '#F9FAFB' : '#111827',
                },

                // Numbers (literals)
                number: {
                  ...oneDark.number,
                  color: theme === 'light' ? '#EF4444' : '#F87171',     // Tailwind red-500 / red-400
                },

                // Booleans & null
                boolean: {
                  ...oneDark.boolean,
                  color: theme === 'light' ? '#10B981' : '#34D399',     // Tailwind emerald-500 / emerald-300
                },

                // Operators (+, -, =, etc.)
                operator: {
                  ...oneDark.operator,
                  color: theme === 'light' ? '#6366F1' : '#818CF8',     // Tailwind indigo-500 / indigo-400
                },

                // Punctuation (braces, semicolons, commas…)
                punctuation: {
                  ...oneDark.punctuation,
                  color: theme === 'light' ? '#6B7280' : '#9CA3AF',     // gray-500 / gray-400
                },

                // Tags in HTML / JSX
                tag: {
                  ...oneDark.tag,
                  color: theme === 'light' ? '#D946EF' : '#E879F9',     // purple-500 / purple-300
                },

                // Attribute names in HTML / JSX
                'attr-name': {
                  ...oneDark['attr-name'],
                  color: theme === 'light' ? '#F59E0B' : '#FBBF24',     // amber-500 / amber-400
                },

                // Class names, constructors, types
                'class-name': {
                  ...oneDark['class-name'],
                  color: theme === 'light' ? '#3B82F6' : '#60A5FA',     // blue-500 / blue-400
                },

                // Regex literals
                regex: {
                  ...oneDark.regex,
                  color: theme === 'light' ? '#14B8A6' : '#2DD4BF',     // teal-500 / teal-300
                },

                // Important highlights (Prism’s “important” or “bold” token)
                important: {
                  ...oneDark.important,
                  fontWeight: 'bold',
                  color: theme === 'light' ? '#2563EB' : '#93C5FD',     // blue-600 / blue-200
                },
              };
              return (
                <AccordionItem value={item.title} key={item.title} className="min-w-full">
                  <AccordionTrigger>
                    <div  className="flex items-center gap-4 w-full text-left">
                    <item.icon className={cn(
                      item.className,
                      "h-8 w-8"
                    )} />
                    <span>
                      {item.title}
                    </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {mounted ? (
                      <SyntaxHighlighter
                        language={item.lang}
                        style={myPrismTheme}
                        PreTag="div"
                        // 2) customStyle applies to the outer <pre> wrapper
                        customStyle={{
                          background: theme === 'light' && mounted ? '#f3f4f6' : '#171717',    // Tailwind gray-900
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          fontSize: '0.875rem',     // text-sm
                          lineHeight: 1.4,
                        }}
                        // 3) codeTagProps applies to the inner <code> tag
                        codeTagProps={{
                          style: {
                            fontFamily: '"Fira Code", monospace',
                            width: "100%"
                          },
                        }}
                        showLineNumbers
                        lineNumberStyle={{
                          color: theme === 'light' ? '#101828' : '#4B5563',          // Tailwind gray-600
                          marginRight: '12px',
                          userSelect: 'none'
                        }}
                      >
                        {item.text}
                      </SyntaxHighlighter>
                    ) : (
                      <Skeleton className="min-w-full h-64 m-0 p-0" />
                    )}
                  </AccordionContent>
                </AccordionItem>

              )
            })}
          </Accordion>

          <Card>
            <CardHeader>
              <CardTitle>Sample ETL Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead className="text-left text-sm text-gray-500">
                  <tr>
                    {table.getHeaderGroups()[0].headers.map((header) => (
                      <th key={header.id} className="pb-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
