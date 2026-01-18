"use client";

import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // listen for new alerts from backend
        socket.on("alert:new", (alert) => {
            setAlerts((prev) => [alert, ...prev]);
        });

        // cleanup to avoid duplicate listeners
        return () => {
            socket.off("alert:new");
        };
    }, []);

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <svg
                                className="h-5 w-5 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Alert History
                            </h3>
                            <p className="text-sm text-slate-500">
                                Recent notifications
                            </p>
                        </div>
                    </div>
                    {alerts.length > 0 && (
                        <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                            {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>

            {/* Alerts List */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
                {alerts.length === 0 ? (
                    <div className="py-8 flex flex-col items-center justify-center text-slate-400">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <svg
                                className="h-6 w-6 opacity-50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-sm font-medium">All clear!</p>
                        <p className="text-xs">No alerts have been triggered yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {alerts.map((a, i) => (
                            <div
                                key={i}
                                className="group relative bg-red-50 border border-red-100 rounded-lg p-4 transition-all hover:bg-red-100"
                            >
                                {/* Alert indicator */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-lg"></div>

                                <div className="flex items-start gap-3 pl-2">
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                            className="h-4 w-4 text-red-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-slate-900 capitalize">
                                                {a.sensorType}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-medium">
                                                {a.value}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {a.explanation}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {new Date(a.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
