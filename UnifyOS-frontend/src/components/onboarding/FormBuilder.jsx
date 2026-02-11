import React, { useState } from 'react';
import { FormInput, Send, Link as LinkIcon } from 'lucide-react';
import { workspaceService } from '../../services/api';

const FormBuilder = ({ workspaceId, onNext }) => {
    const [formConfig, setFormConfig] = useState({
        title: "Contact Us",
        fields: ['name', 'email', 'message'],
        welcome_message: "Thanks for reaching out! We'll get back to you shortly."
    });

    const handleSaveForm = async () => {
        try {
            // In a real app, this would save the config to the DB
            // For the MVP, we advance the onboarding state
            await workspaceService.update(workspaceId, { onboarding_step: 4 });
            onNext();
        } catch (err) {
            alert("Failed to save form configuration.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="bg-sky-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FormInput className="text-sky-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold">Create Your Contact Form</h2>
                <p className="text-slate-400 text-sm mt-2">
                    This form will live on your public booking page to capture new leads.
                </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preview</div>
                <div className="space-y-3 opacity-60 pointer-events-none">
                    <div className="h-10 bg-slate-700 rounded-md w-full" />
                    <div className="h-10 bg-slate-700 rounded-md w-full" />
                    <div className="h-24 bg-slate-700 rounded-md w-full" />
                </div>
            </div>

            <div className="space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-slate-300">Welcome Message (Automation)</span>
                    <textarea
                        className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-sky-500 outline-none"
                        value={formConfig.welcome_message}
                        onChange={(e) => setFormConfig({ ...formConfig, welcome_message: e.target.value })}
                        rows={2}
                    />
                </label>
            </div>

            <button
                onClick={handleSaveForm}
                className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
            >
                Save & Generate Link <Send size={18} />
            </button>
        </div>
    );
};

export default FormBuilder;