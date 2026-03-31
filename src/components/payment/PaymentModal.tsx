export default function PaymentModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-gray-600">Please wait while we process your payment securely...</p>
      </div>
    </div>
  )
}
