"use client";

export default function Dashboard({ insights }: any) {
  if (!insights || insights.length === 0) {
    return (
      <p className="mt-10 text-gray-500 text-center">
        No insights yet. Upload data and analyze.
      </p>
    );
  }

  // Calculate savings
  const totalSavings = insights.reduce((sum: number, item: any) => {
    const match = item.impact?.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <div className="mt-10">
      
      {/* HERO CARD */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold">Estimated Monthly Savings</h2>
        <p className="text-3xl font-bold mt-2">₹{totalSavings}</p>
      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((item: any, i: number) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold text-red-600">
              {item.issue}
            </h2>

            <p className="mt-2">
              <strong>Impact:</strong> {item.impact}
            </p>

            <p>
              <strong>Severity:</strong>{" "}
              <span
                className={`${
                  item.severity === "High"
                    ? "text-red-500"
                    : item.severity === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {item.severity}
              </span>
            </p>

            <p>
              <strong>Action:</strong> {item.action}
            </p>

            <button
              onClick={() => alert(`Executing: ${item.action}`)}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Fix this
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}