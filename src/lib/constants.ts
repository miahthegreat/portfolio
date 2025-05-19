import { FaNodeJs, FaPython } from "react-icons/fa";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiShadcnui } from "react-icons/si";
import { TbFileTypeSql } from "react-icons/tb";

export const psuChartData = [
  { month: "Apr '24", internetPSUs: 8311, videoPSUs: 3160, voicePSUs: 3115, mobilePSUs: 7892, mobileLines: 9100 },
  { month: "May '24", internetPSUs: 8289, videoPSUs: 3894, voicePSUs: 2306, mobilePSUs: 7780, mobileLines: 9958 },
  { month: "Jun '24", internetPSUs: 8437, videoPSUs: 3580, voicePSUs: 3966, mobilePSUs: 7625, mobileLines: 9587 },
  { month: "Jul '24", internetPSUs: 8144, videoPSUs: 3672, voicePSUs: 1270, mobilePSUs: 7919, mobileLines: 9175 },
  { month: "Aug '24", internetPSUs: 8609, videoPSUs: 3397, voicePSUs: 3985, mobilePSUs: 7191, mobileLines: 9703 },
  { month: "Sep '24", internetPSUs: 8793, videoPSUs: 3704, voicePSUs: 3454, mobilePSUs: 7730, mobileLines: 9824 },
  { month: "Oct '24", internetPSUs: 8038, videoPSUs: 3095, voicePSUs: 1396, mobilePSUs: 7390, mobileLines: 9546 },
  { month: "Nov '24", internetPSUs: 8671, videoPSUs: 3867, voicePSUs: 2957, mobilePSUs: 7160, mobileLines: 9176 },
  { month: "Dec '24", internetPSUs: 8232, videoPSUs: 3632, voicePSUs: 1848, mobilePSUs: 7023, mobileLines: 9631 },
  { month: "Jan '25", internetPSUs: 8986, videoPSUs: 3974, voicePSUs: 1689, mobilePSUs: 7151, mobileLines: 9940 },
  { month: "Feb '25", internetPSUs: 8483, videoPSUs: 3157, voicePSUs: 3771, mobilePSUs: 7715, mobileLines: 9413 },
  { month: "Mar '25", internetPSUs: 8038, videoPSUs: 3656, voicePSUs: 3484, mobilePSUs: 7536, mobileLines: 9845 },
  { month: "Apr '25", internetPSUs: 8863, videoPSUs: 3244, voicePSUs: 3791, mobilePSUs: 7201, mobileLines: 9741 },
  { month: "May '25", internetPSUs: 8749, videoPSUs: 3052, voicePSUs: 2064, mobilePSUs: 7373, mobileLines: 9875 },
  { month: "Jun '25", internetPSUs: 8774, videoPSUs: 3021, voicePSUs: 3613, mobilePSUs: 7995, mobileLines: 9334 },
  { month: "Jul '25", internetPSUs: 8972, videoPSUs: 3890, voicePSUs: 1499, mobilePSUs: 7910, mobileLines: 9559 },
  { month: "Aug '25", internetPSUs: 8856, videoPSUs: 3791, voicePSUs: 2044, mobilePSUs: 7450, mobileLines: 9558 },
  { month: "Sep '25", internetPSUs: 8907, videoPSUs: 3942, voicePSUs: 1942, mobilePSUs: 7044, mobileLines: 9434 },
  { month: "Oct '25", internetPSUs: 8057, videoPSUs: 3349, voicePSUs: 1315, mobilePSUs: 7788, mobileLines: 9557 },
  { month: "Nov '25", internetPSUs: 8604, videoPSUs: 3989, voicePSUs: 2231, mobilePSUs: 7634, mobileLines: 9392 },
  { month: "Dec '25", internetPSUs: 8877, videoPSUs: 3998, voicePSUs: 2349, mobilePSUs: 7674, mobileLines: 9423 },
  { month: "Jan '26", internetPSUs: 8569, videoPSUs: 3885, voicePSUs: 1778, mobilePSUs: 7786, mobileLines: 9772 },
  { month: "Feb '26", internetPSUs: 8476, videoPSUs: 3916, voicePSUs: 2204, mobilePSUs: 7525, mobileLines: 9398 },
  { month: "Mar '26", internetPSUs: 8474, videoPSUs: 3198, voicePSUs: 3761, mobilePSUs: 7450, mobileLines: 9338 },
  { month: "Apr '26", internetPSUs: 8222, videoPSUs: 3853, voicePSUs: 1430, mobilePSUs: 7267, mobileLines: 9817 },
];

export const code = [
  {
    lang: "excel-formula",
    title: "Excel",
    className: "text-green-500",
    text: `// Assuming you have an Excel Table named "Data" with columns Value and Category
    
    // 1) Multiply each Value by 100
    // In a new column (e.g. “ScaledValue”):
    =[@Value] * 100
    
    // 2) Sum ScaledValue by Category “A”
    =SUMIFS(Data[ScaledValue], Data[Category], "A")
    
    // 3) Flag high values
    =IF([@Value] > 500, "High", "Low")
    
    // 4) VLOOKUP example: pull Price from a PriceList table
    =VLOOKUP([@Item], PriceList!$A:$B, 2, FALSE)
    
    // 5) Dynamic filter (Office 365+):
    =FILTER(Data[Value], Data[Category]="B", "No results")`,
    icon: PiMicrosoftExcelLogo,
  },
  {
    lang: "sql",
    title: "SQL",
    className: "text-green-500",
    text: `-- 1) Simple select and scale
    SELECT
      *,
      Value * 100 AS ScaledValue
    FROM SalesData;
    
    -- 2) Sum ScaledValue by Category
    SELECT
      Category,
      SUM(Value * 100) AS TotalScaled
    FROM SalesData
    GROUP BY Category;
    
    -- 3) Flag high values with CASE
    SELECT
      *,
      CASE
        WHEN Value > 500 THEN 'High'
        ELSE 'Low'
      END AS ValueFlag
    FROM SalesData;
    
    -- 4) Join example: enrich SalesData with product names
    SELECT
      s.OrderID,
      p.ProductName,
      s.Quantity,
      s.UnitPrice,
      (s.UnitPrice * s.Quantity) AS LineTotal
    FROM SalesData AS s
    LEFT JOIN Products AS p
      ON s.ProductID = p.ProductID;
    
    -- 5) CTE + window function: running total per Category
    WITH CTE AS (
      SELECT
        OrderDate,
        Category,
        Value,
        Value * 100 AS ScaledValue,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY OrderDate) AS rn
      FROM SalesData
    )
    SELECT
      OrderDate,
      Category,
      ScaledValue,
      SUM(ScaledValue) OVER (PARTITION BY Category ORDER BY rn) AS RunningTotal
    FROM CTE;`,
    icon: TbFileTypeSql,
  },
  {
    lang: "python",
    title: "Python",
    className: 'text-purple-600 dark:text-yellow-300',
    text: `import pandas as pd
  
  df = pd.read_csv('data.csv')
  df['value'] = df['value'].apply(lambda x: x * 100)
  df.to_excel('output.xlsx', index=False)`,
    icon: FaPython,
  },
  {
    lang: "tsx",
    title: "NextJS",
    className: 'text-gray-700 dark:text-gray-50',
    text: `'use client'
  
  import { useState } from 'react';
  
  export function Counter() {
    const [count, setCount] = useState(0);
    return (
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    );
  }
  `,
    icon: RiNextjsFill,
  },
  {
    lang: "javascript",
    title: "NodeJS",
    className: 'text-gray-700 dark:text-gray-50',
    text: `import express from 'express';
  const app = express();
  
  app.get('/api', (req, res) => res.send('Hello Node!'));
  app.listen(3000, () => console.log('Listening on port 3000'));
  `,
    icon: FaNodeJs,
  },
  {
    lang: "tsx",
    title: "Tailwind CSS",
    className: 'text-cyan-500 dark:text-cyan-300',
    text: `<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
    Tailwind Button
  </button>
  `,
    icon: RiTailwindCssFill,
  },
  {
    lang: "tsx",
    title: "ShadCN",
    className: 'text-gray-500 dark:text-gray-100',
    text: `import { Button } from '@/components/ui/button';
  
  export function ShadcnButton() {
    return <Button variant="default">Click me</Button>;
  }
  `,
    icon: SiShadcnui,
  },
]
