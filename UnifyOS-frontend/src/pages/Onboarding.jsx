import React, { useState } from 'react';
import { workspaceService } from '../services/api';
import { CheckCircle2, Building2, Mail, Calendar, Package, Users, Rocket } from 'lucide-react';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [workspace, setWorkspace] = useState(null);
    const [formData, setFormData] = useState({
        business_name: '',
        address: '',
        timezone: 'UTC',
        contact_email: ''
    });

    const handleCreateWorkspace = async () => {
        try {
            const res = await workspaceService.create(formData);
            setWorkspace(res.data);
            setStep(2);
        } catch (err) {
            alert("Error creating workspace. Check console.");
        }
    };

    const updateIntegration = async (type, config) => {
        try {
            const updatedIntegrations = { ...workspace.integrations, [type]: config };
            const res = await workspaceService.update(workspace.id, {
                integrations: updatedIntegrations,
                onboarding_step: step + 1
            });
            setWorkspace(res.data);
            setStep(step + 1);
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <div key={s} className={`h-2 flex-1 mx-1 rounded-full ${s <= step ? 'bg-sky-500' : 'bg-slate-700'}`} />
                    ))}
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <Building2 className="text-sky-500" /> Create Workspace
                        </h2>
                        <input
                            type="text" placeholder="Business Name"
                            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg"
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        />
                        <input
                            type="email" placeholder="Contact Email"
                            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg"
                            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        />
                        <button
                            onClick={handleCreateWorkspace}
                            className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-lg font-bold transition"
                        >
                            Start Onboarding
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 text-center">
                        <Mail size={48} className="mx-auto text-sky-500" />
                        <h2 className="text-2xl font-bold">Connect Email & SMS</h2>
                        <p className="text-slate-400">At least one channel is mandatory to activate your inbox.</p>
                        <button
                            onClick={() => updateIntegration('email', { provider: 'Resend', active: true })}
                            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl hover:bg-slate-700 transition"
                        >
                            Connect Resend (Email)
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            className="text-slate-500 hover:text-white"
                        >
                            Skip for now
                        </button>
                    </div>
                )}

                {/* Note: In a real app, you'd repeat patterns for steps 3-7 (Bookings, Forms, Inventory) */}

                {step === 8 && (
                    <div className="space-y-6 text-center">
                        <Rocket size={64} className="mx-auto text-emerald-500 animate-bounce" />
                        <h2 className="text-3xl font-bold">Ready for Launch?</h2>
                        <p className="text-slate-400">All systems checked. Your automation is ready to start.</p>
                        <button
                            onClick={async () => {
                                await workspaceService.activate(workspace.id);
                                window.location.href = '/dashboard';
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold text-xl"
                        >
                            Activate Workspace
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;