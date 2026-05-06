'use client'

import { useState } from 'react'

export default function GstCalculator() {
  const [amount, setAmount] = useState(1000)
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState<'add' | 'remove'>('add')

  let netAmount = amount
  let gstAmount = 0
  let totalAmount = 0

  if (mode === 'add') {
    gstAmount = (amount * rate) / 100
    totalAmount = amount + gstAmount
  } else {
    totalAmount = amount
    netAmount = amount / (1 + rate / 100)
    gstAmount = totalAmount - netAmount
  }

  return (
    <div className="py-20 lg:py-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            GST Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Calculate GST amount and net price instantly.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Input Section */}
            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">Calculation Type</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setMode('add')} 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'add' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                  >
                    Add GST (+ GST)
                  </button>
                  <button 
                    onClick={() => setMode('remove')} 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'remove' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                  >
                    Remove GST (- GST)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">{mode === 'add' ? 'Base Amount' : 'Total Amount (Inc. GST)'}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">₹</span>
                  </div>
                  <input 
                    type="number" 
                    value={amount || ''} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">Tax Slab (%)</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[5, 12, 18, 28].map(r => (
                    <button 
                      key={r} 
                      onClick={() => setRate(r)} 
                      className={`py-2 text-sm font-medium rounded-lg border transition-colors ${rate === r ? 'border-[#10b981] bg-[#10b981] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Custom Rate:</span>
                  <div className="relative flex-1">
                    <input 
                      type="number" 
                      value={rate || ''}
                      onChange={(e) => setRate(e.target.value ? Number(e.target.value) : 0)}
                      className="w-full pl-4 pr-8 py-2 rounded-lg border border-gray-200 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
                      placeholder="Enter custom %"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Calculation Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Net Amount</span>
                  <span className="font-medium text-gray-900">₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="text-gray-600">Total GST ({rate}%)</span>
                  <span className="font-medium text-gray-900">₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 pl-4">
                  <span>CGST ({(rate/2)}%)</span>
                  <span>₹{(gstAmount/2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 pl-4">
                  <span>SGST ({(rate/2)}%)</span>
                  <span>₹{(gstAmount/2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-bold text-xl text-[#10b981]">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-20 prose prose-lg prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a GST Calculator?</h2>
          <p className="text-gray-600 mb-6">
            A Goods and Services Tax (GST) calculator is a simple tool designed to compute the tax amount on a product or service. Whether you are a business owner generating an invoice or a consumer verifying prices, our GST calculator helps you find the gross or net product price on percentage-based GST rates instantly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Add GST to Base Amount?</h2>
          <p className="text-gray-600 mb-6">
            To calculate the final price including GST:<br />
            <strong>GST Amount = (Original Cost × GST Rate) / 100</strong><br />
            <strong>Net Price = Original Cost + GST Amount</strong><br />
            For example, if a product costs ₹1000 and the GST rate is 18%, the GST amount is ₹180, making the total price ₹1180.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Remove GST from Total Amount?</h2>
          <p className="text-gray-600 mb-6">
            If you have the final price and want to find out the base amount before GST was added:<br />
            <strong>Base Amount = Total Price / (1 + (GST Rate / 100))</strong><br />
            <strong>GST Amount = Total Price - Base Amount</strong><br />
            This is extremely useful when doing reverse calculations for business accounting or tax filings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding GST Slabs in India</h2>
          <p className="text-gray-600">
            In India, goods and services are classified under various tax slabs: <strong>5%, 12%, 18%, and 28%</strong>. Essential items often fall under the lower slabs or are exempt entirely, while luxury goods and services are taxed at higher rates. The total GST is typically split evenly into CGST (Central Goods and Services Tax) and SGST (State Goods and Services Tax) for intra-state sales.
          </p>
        </div>

      </div>
    </div>
  )
}
