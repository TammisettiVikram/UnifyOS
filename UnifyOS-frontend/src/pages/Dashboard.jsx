import React, { useEffect, useState } from 'react';
import { opsService } from '../services/api';
import {
    LayoutDashboard, Calendar, MessageSquare,
    FileText, AlertTriangle, ArrowRight
} from 'lucide-react';

const Dashboard = ({ workspaceId = 1 }) => {
    const [stats, setStats] = useState({
        today_bookings: 0,
        pending_forms: 0,
        low_stock_alerts: [],
        unanswered_messages: 2 // Mocked for UI
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await opsService.getDashboard(workspaceId);
                setStats(prev => ({ ...prev, ...res.data }));
            } catch (err) {
                console.error("Failed to fetch dashboard stats");
            }
        };
        fetchStats();
    }, [workspaceId]);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
                <span className="text-3xl font-bold">{value}</span>
            </div>
            <h3 className="text-slate-400 font-medium">{title}</h3>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Business Overview</h1>
                        <p className="text-slate-400">What is happening in your business right now?</p>
                    </div>
                    <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-sm">
                        Live Updates Enabled
                    </div>
                </header>

                {/* 4 Core Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Today's Bookings" value={stats.today_bookings} icon={Calendar} color="bg-blue-600" />
                    <StatCard title="New Inquiries" value={stats.unanswered_messages} icon={MessageSquare} color="bg-purple-600" />
                    <StatCard title="Pending Forms" value={stats.pending_forms} icon={FileText} color="bg-amber-600" />
                    <StatCard title="Inventory Alerts" value={stats.low_stock_alerts.length} icon={AlertTriangle} color="bg-rose-600" />
                </div>

                {/* Critical Alerts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <AlertTriangle className="text-rose-500" /> Key Attention Required
                        </h2>

                        {stats.low_stock_alerts.length > 0 ? (
                            stats.low_stock_alerts.map((item, idx) => (
                                <div key={idx} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-rose-200">Critical Inventory Warning</p>
                                        <p className="text-sm text-rose-300/70">{item} is below the threshold.</p>
                                    </div>
                                    <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                        Restock <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500">
                                No critical alerts today. Everything is running smoothly.
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition">
                                + Manual Booking
                            </button>
                            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition">
                                Send Mass Form
                            </button>
                            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition">
                                Generate Weekly Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;