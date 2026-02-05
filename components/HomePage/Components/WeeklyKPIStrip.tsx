"use client";

export default function WeeklyKPIStrip() {
  const kpis = [
    {
      label: "Tổng hộ quản lý",
      value: "60",
    },
    {
      label: "Diện tích canh tác",
      value: "143 ha",
    },
    {
      label: "Cây trồng chính",
      value: "Sầu riêng",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow px-4 py-4 text-center"
        >
          <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
          <p className="text-lg font-semibold text-gray-900">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
