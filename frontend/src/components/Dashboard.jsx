"use client";

import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import SensorChart from "./SensorChart";
import ThresholdForm from "./ThresholdForm";
import Alerts from "./Alerts";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on("sensor:update", (d) => {
            setData((prev) => [...prev.slice(-30), d]);
        });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-slate-900">
                                    Sensor Dashboard
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Real-time monitoring system
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Live
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Configuration & Alerts */}
                    <div className="lg:col-span-1 space-y-6">
                        <ThresholdForm />
                        <Alerts />
                    </div>

                    {/* Right Column - Chart */}
                    <div className="lg:col-span-2">
                        <SensorChart data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
}
