export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind is Working 🚀
        </h1>
        <p className="text-gray-500 mb-6">
          If you see rounded corners, shadow and spacing — it's configured correctly.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}