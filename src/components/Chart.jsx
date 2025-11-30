import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Chart({ data, title, type = "line", dataKeys = [] }) {
  const renderChart = () => {
    if (type === "bar") {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeys[0] || "name"} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend />
          {dataKeys.slice(1).map((key, idx) => (
            <Bar key={key} dataKey={key} fill={idx === 0 ? "#3AA174" : idx === 1 ? "#C8A656" : "#8FCFA7"} radius={[8, 8, 0, 0]} />
          ))}
        </BarChart>
      )
    } else if (type === "area") {
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeys[0] || "month"} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend />
          {dataKeys.slice(1).map((key, idx) => (
            <Area key={key} type="monotone" dataKey={key} stroke={idx === 0 ? "#3AA174" : "#C8A656"} fill={idx === 0 ? "#3AA174" : "#C8A656"} fillOpacity={0.6} />
          ))}
        </AreaChart>
      )
    } else {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={dataKeys[0] || "month"} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend />
          {dataKeys.slice(1).map((key, idx) => (
            <Line key={key} type="monotone" dataKey={key} stroke={idx === 0 ? "#3AA174" : "#C8A656"} strokeWidth={3} dot={{ fill: idx === 0 ? "#3AA174" : "#C8A656", r: 5 }} />
          ))}
        </LineChart>
      )
    }
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-[#0F5132] mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
