import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [loanAmount, setLoanAmount] = useState<string>('5000');
  const [interestRate, setInterestRate] = useState<string>('5.5');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [downPayment, setDownPayment] = useState<string>('1000');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const calculateLoanPayment = useCallback(() => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm);

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(0);
    }
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateLoanPayment();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-8">
            <Calculator className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">
              Loan Payment Calculator
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="loanAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="loanAmount"
                  id="loanAmount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-gray-700"
              >
                Interest Rate (%)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="focus:ring-green-500 focus:border-green-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="loanTerm"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Term (months)
              </label>
              <input
                type="number"
                name="loanTerm"
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="downPayment"
                className="block text-sm font-medium text-gray-700"
              >
                Down Payment
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="downPayment"
                  id="downPayment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Calculate Payment
            </button>
          </form>

          {monthlyPayment > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Monthly Payment
              </h2>
              <p className="text-3xl font-bold text-green-600">
                ${monthlyPayment.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;