import { Card } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { LightningBolt } from "@/assets/LightningBolt";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function Introduction() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['home']);

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-100'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {t('introduction.title')}
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
            } mb-4`}>
              {t('introduction.subtitle')}
            </p>
            <p className={`text-base ${
              theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-600'
            } mb-8`}>
              {t('introduction.description')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Card className={`${
                theme === 'dark' ? 'bg-[#121218] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              } p-4 transition-all duration-300 hover:shadow-md`}>
                <Clock className="w-8 h-8 text-[#60a5fa] mb-3" />
                <h3 className={`font-semibold text-lg mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {t('introduction.cards.saveTime.title')}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-600'
                }`}>
                  {t('introduction.cards.saveTime.description')}
                </p>
              </Card>

              <Card className={`${
                theme === 'dark' ? 'bg-[#121218] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              } p-4 transition-all duration-300 hover:shadow-md`}>
                <CheckCircle className="w-8 h-8 text-[#60a5fa] mb-3" />
                <h3 className={`font-semibold text-lg mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {t('introduction.cards.alwaysAvailable.title')}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-600'
                }`}>
                  {t('introduction.cards.alwaysAvailable.description')}
                </p>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* Gradienti di sfondo */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${
                theme === 'dark' 
                ? 'from-purple-500/20 to-blue-500/20' 
                : 'from-purple-400/20 to-[#3662e3]/20'
              } rounded-full blur-3xl`}></div>
              
              {/* Overlay per migliorare il contrasto sul tema chiaro */}
              {theme === 'light' && (
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
              )}
              
              <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
                <div className={`animate-[glow_2s_ease-in-out_infinite_alternate] filter ${
                  theme === 'dark'
                  ? 'drop-shadow-[0_0_15px_rgba(54,98,227,0.7)]'
                  : 'drop-shadow-[0_0_15px_rgba(54,98,227,0.5)]'
                }`}>
                  <LightningBolt className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
