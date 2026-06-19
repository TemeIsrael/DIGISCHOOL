import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, User, MessageSquare, BookOpen } from 'lucide-react';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { Card } from '../shared/components/ui/Card';
import { Button } from '../shared/components/ui/Button';
import { useTranslation } from 'react-i18next';


interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  
  const contactInfos = [
    {
      icon: <MapPin className="w-5 h-5 text-digi-purple" />,
      label: t('contact.address'),
      value: t('contact.addressValue')
    },
    {
      icon: <Phone className="w-5 h-5 text-digi-purple" />,
      label: t('contact.phone'),
      value: t('contact.phoneValue')
    },
    {
      icon: <Mail className="w-5 h-5 text-digi-purple" />,
      label: t('contact.emailLabel'),
      value: t('contact.emailValue')
    },
    {
      icon: <BookOpen className="w-5 h-5 text-digi-purple" />,
      label: t('contact.support'),
      value: t('contact.supportValue')
    }
  ];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate sending (stub — no real API call)
    await new Promise((res) => setTimeout(res, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-digi-purple-dark via-slate-900 to-slate-950 py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-digi-purple/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-digi-purple-light/10 rounded-full -ml-24 -mb-24 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-digi-purple flex items-center justify-center mx-auto shadow-lg shadow-digi-purple/30">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{t('contact.title')}</h1>
          <p className="text-slate-300 text-sm font-medium max-w-md mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">{t('contact.infoTitle')}</h2>
            {contactInfos.map((info, i) => (
              <Card key={i} className="border border-slate-100 shadow-sm p-4 flex items-start gap-4 hover:shadow-md hover:border-digi-purple/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-digi-purple-bg flex items-center justify-center shrink-0 border border-digi-purple-border/20">
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">{info.label}</p>
                  <p className="text-sm text-slate-700 font-medium whitespace-pre-line">{info.value}</p>
                </div>
              </Card>
            ))}

            {/* Map placeholder */}
            <Card className="border border-slate-100 overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(83,74,183,0.5)_1px,transparent_1px)] bg-[length:20px_20px]" />
                <div className="relative text-center space-y-2">
                  <MapPin className="w-8 h-8 text-digi-purple mx-auto" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yaoundé, Cameroun</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">{t('contact.sendMessage')}</h2>
                <p className="text-sm text-slate-400 mt-1">{t('contact.requiredFields')}</p>
              </div>

              {/* Success message */}
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  {t('contact.successMsg')}
                </div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {t('contact.errorMsg')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t('contact.fullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: NKOA Jean-Pierre"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t('contact.emailAddress')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre.email@exemple.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t('contact.subjectLabel')}
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="Inscription d'un élève">{t('contact.subEnroll')}</option>
                    <option value="Problème de connexion">{t('contact.subLogin')}</option>
                    <option value="Question sur les paiements">{t('contact.subPayment')}</option>
                    <option value="Accès à la bibliothèque">{t('contact.subLibrary')}</option>
                    <option value="Demande de bulletin scolaire">{t('contact.subBulletin')}</option>
                    <option value="Réclamation ou plainte">{t('contact.subComplaint')}</option>
                    <option value="Partenariat ou information générale">{t('contact.subPartnership')}</option>
                    <option value="Autre">{t('contact.subOther')}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {t('contact.yourMessage')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all resize-none bg-slate-50 focus:bg-white"
                  />
                  <p className="text-xs text-slate-400 text-right">{formData.message.length} / 1000</p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-digi-purple/20 gap-2"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
export default ContactPage;
