'use client';
import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import { Tooltip } from '@nextui-org/react';

import { type ChartConfig, ChartContainer } from '@/app/components/ui/chart';

const chartConfig = {
  count: {
    label: 'Count',
  },
  expected: {
    label: 'Passed',
    color: 'hsl(var(--chart-1))',
  },
  unexpected: {
    label: 'Failed',
    color: 'hsl(var(--chart-2))',
  },
  flaky: {
    label: 'Flaky',
    color: 'hsl(var(--chart-3))',
  },
  skipped: {
    label: 'Skipped',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

interface StatChartProps {
  stats: {
    total: number;
    expected: number;
    unexpected: number;
    flaky: number;
    skipped: number;
    ok: boolean;
  };
}

export function SmallStatChart({ stats }: Readonly<StatChartProps>) {
  const chartData = [
    {
      count: stats.expected,
      status: 'Passed',
      fill: 'hsl(var(--chart-1))',
    },
    {
      count: stats.unexpected,
      status: 'Failed',
      fill: 'hsl(var(--chart-2))',
    },
    { count: stats.flaky, status: 'Flaky', fill: 'hsl(var(--chart-4))' },
    {
      count: stats.skipped,
      status: 'Skipped',
      fill: 'hsl(var(--chart-3))',
    },
  ];

  return (
    <Tooltip
      content={
        <div>
          <div>{`Total: ${stats.total} `}</div>
          {stats.expected > 0 && <div className="text-[color:hsl(var(--chart-1))]">{`Passed: ${stats.expected} `}</div>}
          {stats.flaky > 0 && <div className="text-[color:hsl(var(--chart-4))]">{`Flaky: ${stats.flaky} `}</div>}
          {stats.skipped > 0 && <div className="text-[color:hsl(var(--chart-3))]">{`Skipped: ${stats.skipped} `}</div>}
          {stats.unexpected > 0 && (
            <div className="text-[color:hsl(var(--chart-2))]">{`Failed: ${stats.unexpected} `}</div>
          )}
        </div>
      }
      placement="top"
    >
      <div className="flex items-center justify-between">
        <ChartContainer className="w-10 mx-0 aspect-square max-h-[50px]" config={chartConfig}>
          <PieChart>
            <Pie data={chartData} dataKey="count" innerRadius={7} nameKey="status" strokeWidth={1} />
          </PieChart>
        </ChartContainer>
        <tspan className="w-24">{`${Math.round((stats.expected / stats.total) * 100)}% passed`}</tspan>
      </div>
    </Tooltip>
  );
}
