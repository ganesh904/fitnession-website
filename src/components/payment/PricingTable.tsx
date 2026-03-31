export default function PricingTable() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
        Compare Plans
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Feature</th>
              <th className="text-center py-4 px-4 font-semibold text-primary-600">Smart</th>
              <th className="text-center py-4 px-4 font-semibold text-secondary-600">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-4 px-4 text-gray-700">Unlimited Mira AI Chat</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-gray-700">Personalized Diet Plans</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-gray-700">Custom Workout Plans</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-gray-700">Progress Tracking</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-gray-700">Health Analytics</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr className="bg-secondary-50">
              <td className="py-4 px-4 text-gray-700 font-semibold">Weekly Calls with Health Coach</td>
              <td className="text-center py-4 px-4 text-gray-400 text-xl">-</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr className="bg-secondary-50">
              <td className="py-4 px-4 text-gray-700 font-semibold">Priority Support</td>
              <td className="text-center py-4 px-4 text-gray-400 text-xl">-</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
            <tr className="bg-secondary-50">
              <td className="py-4 px-4 text-gray-700 font-semibold">Advanced Analytics</td>
              <td className="text-center py-4 px-4 text-gray-400 text-xl">-</td>
              <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
