"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface ChartCardProps {
  title: string;
  option: echarts.EChartsOption;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, option, height = 300 }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(option);
      return () => chart.dispose();
    }
  }, [option]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-gray-600 font-semibold mb-4">{title}</h2>
      <div ref={chartRef} style={{ height }} />
    </div>
  );
};

export default ChartCard;
