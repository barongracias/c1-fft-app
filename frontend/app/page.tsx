// app/page.tsx
"use client";
import { useState } from "react";

type FftResponse = {
  k: number; n: number; L: number;
  bin_index: number;
  ideal_bin_float: number;
  bin_offset_from_integer: number;
  Y_m_real: number; Y_m_imag: number; Y_m_abs: number;
  Y_m_norm_real: number; Y_m_norm_imag: number; Y_m_norm_abs: number;
  note: string;
};

export default function Page() {
  const [n, setN] = useState(4096);
  const [L, setL] = useState(2 * Math.PI);
  const [k, setK] = useState(14);
  const [data, setData] = useState<FftResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    try {
      setLoading(true); setErr(null);
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/fft`);
      url.search = new URLSearchParams({
        n: String(n),
        L: String(L),
        k: String(k),
      }).toString();

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(await res.text());
      const j = (await res.json()) as FftResponse;
      setData(j);
    } catch (e: any) {
      setErr(e.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Signal Lab
        </h1>
        <p className="text-center text-gray-500">
          Experiment with FFT parameters and see how the output changes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col text-sm font-medium text-gray-700">
            <span className="mb-1">N (samples)</span>
            <input
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              type="number"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value || "0"))}
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-gray-700">
            <span className="mb-1">L (period)</span>
            <input
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              type="number"
              step="any"
              value={L}
              onChange={(e) => setL(parseFloat(e.target.value || "0"))}
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-gray-700">
            <span className="mb-1">k (frequency index)</span>
            <input
              className="border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              type="number"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value || "0"))}
            />
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={run}
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
          >
            {loading ? "Computing…" : "Compute FFT Bin"}
          </button>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {err}
          </div>
        )}

        {data && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-auto max-h-96">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Result</h2>
            <pre className="text-sm text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
