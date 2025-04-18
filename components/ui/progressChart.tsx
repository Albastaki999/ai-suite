import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"

interface ChartProps {
  chartData: { label: string; value: number }[]
  totalQuestions: number
}

const COLORS = ["#00C49F", "#FF6B6B"]; // Green for correct, red for incorrect

const chartConfig = {
  Correct: {
    label: "Correct",
    color: "#00C49F", // green
  },
  Incorrect: {
    label: "Incorrect",
    color: "#FF6B6B", // red
  },
} satisfies ChartConfig


export function ProgressChart({ chartData, totalQuestions }: ChartProps) {
  const percentage = Math.round((chartData[0]?.value / totalQuestions) * 100)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl" >Quiz Performance</CardTitle>
        <CardDescription>Correct vs Incorrect</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
            
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={90}
              outerRadius={125}
              strokeWidth={5}
              // cornerRadius={6}
              paddingAngle={2}
              // labelLine={true}
              // label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 5}
                          className="fill-foreground text-[50px] font-bold"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground text-2xl"
                        >
                          Correct
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          You got {chartData[0].value} out of {totalQuestions} right!{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Keep practicing to improve even more.
        </div>
      </CardFooter>
    </Card>
  )
}
