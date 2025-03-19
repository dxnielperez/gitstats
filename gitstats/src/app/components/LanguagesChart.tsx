"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LanguagesChartProps {
  languages: { [key: string]: number };
}

export function LanguagesChart({ languages }: LanguagesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!languages || !chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const originalValues = Object.values(languages);

    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(languages),
          datasets: [
            {
              label: "Code Size",
              data: originalValues,
              backgroundColor: [
                "#FF6384", // CSS
                "#36A2EB", // Go
                "#FFCE56", // HTML
                "#4BC0C0", // JavaScript
                "#9966FF", // Python
                "#FF9F40", // Shell
                "#E7E9ED", // TypeScript
              ],
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "logarithmic",
              title: { display: true, text: "Code Size (Log Scale)" },
              ticks: {
                callback: (tickValue) => {
                  const numValue = Number(tickValue);
                  if (numValue === 1) return "1";
                  if (numValue >= 1000) return `${numValue / 1000}k`;
                  return numValue.toString();
                },
              },
            },
            x: {
              title: { display: true, text: "Languages" },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.label}: ${originalValues[context.dataIndex]} bytes`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [languages]);

  return (
    <div className="mt-6">
      <h3 className="text-xl text-white">Language Code Size</h3>
      <canvas ref={chartRef} className="max-h-64" />
    </div>
  );
}
