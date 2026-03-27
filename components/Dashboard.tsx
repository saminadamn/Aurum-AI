"use client";

export default function Dashboard({ insights }: any) {
  if (!insights || insights.length === 0) {
    return (
      <p className="mt-10 text-gray-500">
        No insights yet. Upload data and analyze.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-4">
      {insights.map((item: any, i: number) => (
        <div
          key={i}
          className="border rounded p-5 shadow bg-white"
        >
          <h2 className="text-lg font-bold text-red-600">
            {item.issue}
          </h2>

          <p className="mt-2">
            <strong>Impact:</strong> {item.impact}
          </p>

          <p>
            <strong>Severity:</strong> {item.severity}
          </p>

          <p>
            <strong>Action:</strong> {item.action}
          </p>

          <button className="mt-3 bg-black text-white px-4 py-2 rounded">
            Fix this
          </button>
        </div>
      ))}
    </div>
  );
}