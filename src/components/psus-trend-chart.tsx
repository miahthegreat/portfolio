'use client';

import {
  XAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  LabelList,
} from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import numeral from 'numeral';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { psuChartData } from '@/lib/constants';
import { useStateContext } from '@/context';
import { useTheme } from 'next-themes';

type PSURecord = {
  month: string;
  internetPSUs: number;
  videoPSUs: number;
  voicePSUs: number;
  mobilePSUs: number;
  mobileLines: number;
};

const sumPSUs = (r: PSURecord) =>
  r.internetPSUs + r.videoPSUs + r.voicePSUs + r.mobilePSUs;

const calculateTrends = (data: PSURecord[]) => {
  if (data.length < 2) return { mom: 0, yoy: 0 };

  const latest = data.at(-1)!;
  const prev = data.at(-2)!;
  const [monthAbbr, yearSuffix] = latest.month.split(" '");
  const lastYearMonth = `${monthAbbr} '${(+yearSuffix - 1).toString().padStart(2, '0')}`;

  const lastYear = data.find((d) => d.month === lastYearMonth);

  const latestTotal = sumPSUs(latest);
  const momTotal = sumPSUs(prev);
  const yoyTotal = lastYear ? sumPSUs(lastYear) : 0;

  return {
    mom: momTotal ? ((latestTotal - momTotal) / momTotal) * 100 : 0,
    yoy: yoyTotal ? ((latestTotal - yoyTotal) / yoyTotal) * 100 : 0,
    momInternet: ((latest.internetPSUs - prev.internetPSUs) / prev.internetPSUs) * 100,
    yoyInternet: lastYear ? ((latest.internetPSUs - lastYear.internetPSUs) / lastYear.internetPSUs) * 100 : 0,
    momVideo: lastYear ? ((latest.videoPSUs - prev.videoPSUs) / prev.videoPSUs) * 100 : 0,
    yoyVideo: lastYear ? ((latest.videoPSUs - lastYear.videoPSUs) / lastYear.videoPSUs) * 100 : 0,
    momVoice: ((latest.voicePSUs - prev.voicePSUs) / prev.voicePSUs) * 100,
    yoyVoice: lastYear ? ((latest.voicePSUs - lastYear.voicePSUs) / lastYear.voicePSUs) * 100 : 0,
    momMobile: ((latest.mobilePSUs - prev.mobilePSUs) / prev.mobilePSUs) * 100,
    yoyMobile: lastYear ? ((latest.mobilePSUs - lastYear.mobilePSUs) / lastYear.mobilePSUs) * 100 : 0,
    momMblLines: ((latest.mobileLines - prev.mobileLines) / prev.mobileLines) * 100,
    yoyMblLines: lastYear ? ((latest.mobileLines - lastYear.mobileLines) / lastYear.mobileLines) * 100 : 0,
    currentMonth: latest.month,
    prevMonth: prev.month,
    lastYear: lastYearMonth,
  };
};

const trends = calculateTrends(psuChartData);


const CHART_CONFIG = {
  internetPSUs: { label: 'Internet', color: 'var(--chart-1)' },
  videoPSUs: { label: 'Video', color: 'var(--chart-2)' },
  voicePSUs: { label: 'Voice', color: 'var(--chart-3)' },
  mobilePSUs: { label: 'Mobile', color: 'var(--chart-4)' },
  mobileLines: { label: 'Mobile Lines', color: 'var(--chart-5)' },
} as const;


const VIEWS = {
  '6mo': 6,
  '13mo': 13,
  '25mo': 25,
} as const;

type ViewKey = keyof typeof VIEWS;

export function PSUTrend() {
  // const [view, setView] = useState<ViewKey>('6mo');
  const { view, setView } = useStateContext();
  const { theme, systemTheme } = useTheme();

  const absTheme = theme == 'system' ? systemTheme : theme;

  const data = psuChartData;
  const visibleData = useMemo(() => {
    const months = VIEWS[view];
    return data.slice(-months);
  }, [data, view]);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <CardTitle>PSUs Sold Trend</CardTitle>
          <CardDescription>
            <div className="text-muted-foreground" suppressHydrationWarning>
              {visibleData[0].month} to {visibleData.at(-1)?.month}
            </div>
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v: ViewKey) => v && setView(v)}
        >
          <ToggleGroupItem value="6mo">6-Month</ToggleGroupItem>
          <ToggleGroupItem value="13mo">13-Month</ToggleGroupItem>
          <ToggleGroupItem value="25mo">25-Month</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>

      <CardContent className='grid gap-2'>
        <ChartContainer config={CHART_CONFIG} className='w-full max-h-72'>
          <BarChart
            accessibilityLayer data={visibleData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="month"
              axisLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickMargin={10}
              tickSize={3}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" className='w-40' />}
            />
            {Object.keys(CHART_CONFIG).map((key) => (
              <Bar key={key} dataKey={key} type="monotone" fill={`var(--color-${key})`} stackId={view != "6mo" ? "psus" : undefined}>
                {view != '6mo' ? null : (
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={9}
                  formatter={(value: number) => numeral(value).format('0.0a')}
                />
                )}
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
        <Accordion type="single" collapsible>
          <AccordionItem value="trends">
            <AccordionTrigger>Trends</AccordionTrigger>
            <AccordionContent>
              <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Month over Month</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momInternet && trends.momInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.momInternet && trends.momInternet < 0 ? 'decreased' : 'increased'} {trends.momInternet ? trends.momInternet.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVideo && trends.momVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.momVideo && trends.momVideo < 0 ? 'decreased' : 'increased'} {trends.momVideo ? trends.momVideo.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVoice && trends.momVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.momVoice && trends.momVoice < 0 ? 'decreased' : 'increased'} {trends.momVoice ? trends.momVoice.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMobile && trends.momMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.momMobile && trends.momMobile < 0 ? 'decreased' : 'increased'} {trends.momMobile ? trends.momMobile.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMblLines && trends.momMblLines < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile Lines sold in {trends.currentMonth} have {trends.momMblLines && trends.momMblLines < 0 ? 'decreased' : 'increased'} {trends.momMblLines ? trends.momMblLines.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>
                </div>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Year over Year</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyInternet && trends.yoyInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.yoyInternet && trends.yoyInternet < 0 ? 'decreased' : 'increased'} {trends.yoyInternet ? trends.yoyInternet.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVideo && trends.yoyVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.yoyVideo && trends.yoyVideo < 0 ? 'decreased' : 'increased'} {trends.yoyVideo ? trends.yoyVideo.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVoice && trends.yoyVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.yoyVoice && trends.yoyVoice < 0 ? 'decreased' : 'increased'} {trends.yoyVoice ? trends.yoyVoice.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyMobile && trends.yoyMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.yoyMobile && trends.yoyMobile < 0 ? 'decreased' : 'increased'} {trends.yoyMobile ? trends.yoyMobile.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

    </Card >
  );
}

export function PSULineTrend() {
  // const [view, setView] = useState<ViewKey>('6mo');
  const { view, setView } = useStateContext();
  const { theme, systemTheme } = useTheme();

  const absTheme = theme == 'system' ? systemTheme : theme;

  const data = psuChartData;
  const visibleData = useMemo(() => {
    const months = VIEWS[view];
    return data.slice(-months);
  }, [data, view]);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <CardTitle>PSUs Sold Trend</CardTitle>
          <CardDescription>
            <div className="text-muted-foreground" suppressHydrationWarning>
              {visibleData[0].month} to {visibleData.at(-1)?.month}
            </div>
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v: ViewKey) => v && setView(v)}
        >
          <ToggleGroupItem value="6mo">6-Month</ToggleGroupItem>
          <ToggleGroupItem value="13mo">13-Month</ToggleGroupItem>
          <ToggleGroupItem value="25mo">25-Month</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <ChartContainer config={CHART_CONFIG} className='w-full max-h-72'>
          <LineChart
            accessibilityLayer
            data={visibleData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="month"
              axisLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickMargin={10}
              tickSize={3}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" className='w-40' />}
            />
            {Object.keys(CHART_CONFIG).map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="natural"
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
        <Accordion type="single" collapsible>
          <AccordionItem value="trends">
            <AccordionTrigger>Trends</AccordionTrigger>
            <AccordionContent>
              <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Month over Month</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momInternet && trends.momInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.momInternet && trends.momInternet < 0 ? 'decreased' : 'increased'} {trends.momInternet ? trends.momInternet.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVideo && trends.momVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.momVideo && trends.momVideo < 0 ? 'decreased' : 'increased'} {trends.momVideo ? trends.momVideo.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVoice && trends.momVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.momVoice && trends.momVoice < 0 ? 'decreased' : 'increased'} {trends.momVoice ? trends.momVoice.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMobile && trends.momMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.momMobile && trends.momMobile < 0 ? 'decreased' : 'increased'} {trends.momMobile ? trends.momMobile.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMblLines && trends.momMblLines < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile Lines sold in {trends.currentMonth} have {trends.momMblLines && trends.momMblLines < 0 ? 'decreased' : 'increased'} {trends.momMblLines ? trends.momMblLines.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>
                </div>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Year over Year</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyInternet && trends.yoyInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.yoyInternet && trends.yoyInternet < 0 ? 'decreased' : 'increased'} {trends.yoyInternet ? trends.yoyInternet.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVideo && trends.yoyVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.yoyVideo && trends.yoyVideo < 0 ? 'decreased' : 'increased'} {trends.yoyVideo ? trends.yoyVideo.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVoice && trends.yoyVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.yoyVoice && trends.yoyVoice < 0 ? 'decreased' : 'increased'} {trends.yoyVoice ? trends.yoyVoice.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyMobile && trends.yoyMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.yoyMobile && trends.yoyMobile < 0 ? 'decreased' : 'increased'} {trends.yoyMobile ? trends.yoyMobile.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

    </Card >
  );
}

export function PSUAreaTrend() {
  // const [view, setView] = useState<ViewKey>('6mo');
  const { view, setView } = useStateContext();
  const { theme, systemTheme } = useTheme();

  const absTheme = theme == 'system' ? systemTheme : theme;

  const data = psuChartData;
  const visibleData = useMemo(() => {
    const months = VIEWS[view];
    return data.slice(-months);
  }, [data, view]);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <CardTitle>PSUs Sold Trend</CardTitle>
          <CardDescription>
            <div className="text-muted-foreground" suppressHydrationWarning>
              {visibleData[0].month} to {visibleData.at(-1)?.month}
            </div>
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v: ViewKey) => v && setView(v)}
        >
          <ToggleGroupItem value="6mo">6-Month</ToggleGroupItem>
          <ToggleGroupItem value="13mo">13-Month</ToggleGroupItem>
          <ToggleGroupItem value="25mo">25-Month</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>

      <CardContent className='grid gap-2'>
        <ChartContainer config={CHART_CONFIG} className='w-full max-h-72'>
          <AreaChart
            data={visibleData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          // className='ring-1 ring-[rgb(2,113,235)]/20 rounded-xl p-4'
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              axisLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickLine={{ stroke: absTheme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)' }}
              tickMargin={10}
              tickSize={3}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className='w-40' />}
            />
            {Object.keys(CHART_CONFIG).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="psus"
              />
            ))}
          </AreaChart>
        </ChartContainer>
        <Accordion type="single" collapsible>
          <AccordionItem value="trends">
            <AccordionTrigger>Trends</AccordionTrigger>
            <AccordionContent>
              <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Month over Month</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momInternet && trends.momInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.momInternet && trends.momInternet < 0 ? 'decreased' : 'increased'} {trends.momInternet ? trends.momInternet.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVideo && trends.momVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.momVideo && trends.momVideo < 0 ? 'decreased' : 'increased'} {trends.momVideo ? trends.momVideo.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momVoice && trends.momVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.momVoice && trends.momVoice < 0 ? 'decreased' : 'increased'} {trends.momVoice ? trends.momVoice.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMobile && trends.momMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.momMobile && trends.momMobile < 0 ? 'decreased' : 'increased'} {trends.momMobile ? trends.momMobile.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>

                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.momMblLines && trends.momMblLines < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile Lines sold in {trends.currentMonth} have {trends.momMblLines && trends.momMblLines < 0 ? 'decreased' : 'increased'} {trends.momMblLines ? trends.momMblLines.toFixed(1) : 0}% compared to {trends.prevMonth}</span>
                  </span>
                </div>
                <div className='grid gap-2'>
                  <h2 className='text-base'>Year over Year</h2>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyInternet && trends.yoyInternet < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Internet PSUs sold in {trends.currentMonth} have {trends.yoyInternet && trends.yoyInternet < 0 ? 'decreased' : 'increased'} {trends.yoyInternet ? trends.yoyInternet.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVideo && trends.yoyVideo < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Video PSUs sold in {trends.currentMonth} have {trends.yoyVideo && trends.yoyVideo < 0 ? 'decreased' : 'increased'} {trends.yoyVideo ? trends.yoyVideo.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyVoice && trends.yoyVoice < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Voice PSUs sold in {trends.currentMonth} have {trends.yoyVoice && trends.yoyVoice < 0 ? 'decreased' : 'increased'} {trends.yoyVoice ? trends.yoyVoice.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                  <span className='font-light flex gap-2 items-center text-xs'>
                    <span>{trends.yoyMobile && trends.yoyMobile < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <TrendingUp className="h-4 w-4 text-green-500" />}</span>
                    <span>Mobile PSUs sold in {trends.currentMonth} have {trends.yoyMobile && trends.yoyMobile < 0 ? 'decreased' : 'increased'} {trends.yoyMobile ? trends.yoyMobile.toFixed(1) : 0}% compared to {trends.lastYear}</span>
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

    </Card >
  );
}