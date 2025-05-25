import ChartCard from "./ChartReuse";

const barOption = {
  tooltip: {},
  xAxis: {
    type: "category",
    data: [
      "Nufik",
      "Madona",
      "John",
      "Doe",
      "Catty",
      "Johnson",
      "Gery",
      "Jerry",
      "XiJuan",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Total Post",
      type: "bar",
      data: [55, 69, 77, 83, 89, 94, 98, 105, 104],
      itemStyle: { color: "#34d399" },
    },
  ],
};

const statusOption = {
  title: {
    text: "95/120",
    left: "center",
    top: "center",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: 0,
    left: "center",
  },
  series: [
    {
      name: "User Status",
      type: "pie",
      radius: ["65%", "80%"],
      avoidLabelOverlap: false,
      label: { show: false },
      labelLine: { show: false },
      data: [
        { value: 95, name: "Active" },
        { value: 25, name: "Non Active" },
      ],
    },
  ],
};

const genderOption = {
  title: {
    text: "120",
    subtext: "Total",
    left: "center",
    top: "center",
    textStyle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    subtextStyle: {
      fontSize: 12,
      color: "#999",
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: 0,
    left: "center",
  },
  series: [
    {
      name: "Gender",
      type: "pie",
      radius: ["65%", "80%"],
      avoidLabelOverlap: false,
      label: { show: false },
      labelLine: { show: false },
      data: [
        { value: 60, name: "Male", itemStyle: { color: "#6366f1" } },
        { value: 60, name: "Female", itemStyle: { color: "#a855f7" } },
      ],
    },
  ],
};

const ChartSection = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ChartCard
            title="Blog Post Quantity"
            option={barOption}
            height={400}
          />
        </div>
        <div className="space-y-6">
          <ChartCard title="User Status" option={statusOption} height={180} />
          <ChartCard
            title="Post Distribution by Gender"
            option={genderOption}
            height={180}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
