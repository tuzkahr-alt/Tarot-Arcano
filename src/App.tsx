/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, ChevronRight, Moon, Star, Sun, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { MAJOR_ARCANA, TarotCard } from './tarotData';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Step = 'intro' | 'question' | 'shuffle' | 'selection' | 'reading';

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [question, setQuestion] = useState('');
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);

  // Initialize deck
  useEffect(() => {
    setShuffledDeck([...MAJOR_ARCANA].sort(() => Math.random() - 0.5));
  }, []);

  const handleStart = () => setStep('question');

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setStep('shuffle');
      setTimeout(() => setStep('selection'), 2000);
    }
  };

  const selectCard = (card: TarotCard) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      const newSelection = [...selectedCards, card];
      setSelectedCards(newSelection);
      if (newSelection.length === 3) {
        generateReading(newSelection);
      }
    }
  };

  const generateReading = async (cards: TarotCard[]) => {
    setIsLoading(true);
    setStep('reading');
    try {
      const prompt = `Actúa como un experto lector de tarot místico. El usuario ha hecho la siguiente pregunta: "${question}".
      Ha seleccionado 3 cartas para una tirada de Pasado, Presente y Futuro:
      1. Pasado: ${cards[0].name}
      2. Presente: ${cards[1].name}
      3. Futuro: ${cards[2].name}
      
      Proporciona una interpretación profunda, espiritual y poética en español. Estructura la respuesta con:
      - Una introducción mística.
      - Análisis detallado de cada carta en su posición.
      - Una síntesis final que responda directamente a la pregunta del usuario.
      Usa formato Markdown para que sea legible.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setInterpretation(response.text || "Las estrellas están nubladas en este momento. Inténtalo de nuevo.");
    } catch (error) {
      console.error("Error generating reading:", error);
      setInterpretation("Hubo un error al conectar con el plano espiritual. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep('intro');
    setQuestion('');
    setSelectedCards([]);
    setInterpretation(null);
    setShuffledDeck([...MAJOR_ARCANA].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-[#0a0502] text-[#e0d8d0] font-serif selection:bg-[#ff4e00]/30 overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3a1510] blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff4e00] blur-[150px] opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Moon className="w-6 h-6 text-[#ff4e00]" />
          <h1 className="text-2xl tracking-widest uppercase font-light">Tarot Arcano</h1>
        </div>
        {step !== 'intro' && (
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-sm uppercase tracking-tighter opacity-60 hover:opacity-100 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        )}
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 min-h-[calc(100vh-88px)] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-8"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-[#ff4e00]/20 rounded-full scale-150"
                />
                <Star className="w-16 h-16 text-[#ff4e00] mx-auto mb-4 animate-pulse" />
              </div>
              <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
                Descubre tu <br /> <span className="italic text-[#ff4e00]">Destino</span>
              </h2>
              <p className="text-xl opacity-60 max-w-md mx-auto font-sans font-light">
                Consulta a los Arcanos Mayores y recibe la sabiduría ancestral guiada por la inteligencia artificial.
              </p>
              <button 
                onClick={handleStart}
                className="group relative px-12 py-4 bg-transparent border border-white/20 rounded-full overflow-hidden transition-all hover:border-[#ff4e00]"
              >
                <div className="absolute inset-0 bg-[#ff4e00] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-lg uppercase tracking-widest group-hover:text-black transition-colors">
                  Comenzar Lectura
                </span>
              </button>
            </motion.div>
          )}

          {step === 'question' && (
            <motion.div 
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <h3 className="text-3xl mb-8 text-center italic">¿Qué deseas consultar al oráculo?</h3>
              <form onSubmit={handleQuestionSubmit} className="space-y-6">
                <textarea
                  autoFocus
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Escribe tu pregunta aquí..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-2xl focus:outline-none focus:border-[#ff4e00] transition-colors min-h-[200px] resize-none font-sans font-light"
                />
                <div className="flex justify-center">
                  <button 
                    type="submit"
                    disabled={!question.trim()}
                    className="flex items-center gap-2 px-8 py-3 bg-[#ff4e00] text-black rounded-full uppercase tracking-widest font-bold disabled:opacity-30 transition-all hover:scale-105"
                  >
                    Consultar <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 'shuffle' && (
            <motion.div 
              key="shuffle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-12"
            >
              <div className="flex justify-center gap-[-40px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, (i - 3) * 50, 0],
                      rotate: [0, (i - 3) * 10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-56 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-2xl flex items-center justify-center"
                  >
                    <div className="w-full h-full m-2 border border-white/5 rounded-lg flex items-center justify-center">
                      <Moon className="w-8 h-8 opacity-20" />
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-2xl italic animate-pulse">Barajando las energías...</p>
            </motion.div>
          )}

          {step === 'selection' && (
            <motion.div 
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-12"
            >
              <div className="text-center">
                <h3 className="text-3xl mb-2 italic">Selecciona 3 cartas</h3>
                <p className="text-sm uppercase tracking-widest opacity-40">
                  {selectedCards.length === 0 ? 'Pasado' : selectedCards.length === 1 ? 'Presente' : 'Futuro'}
                </p>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-11 gap-2 max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
                {shuffledDeck.map((card, idx) => {
                  const isSelected = selectedCards.find(c => c.id === card.id);
                  return (
                    <motion.div
                      key={card.id}
                      whileHover={{ y: -10 }}
                      onClick={() => !isSelected && selectCard(card)}
                      className={`
                        aspect-[2/3] rounded-lg cursor-pointer transition-all duration-500
                        ${isSelected ? 'opacity-20 scale-90 grayscale' : 'bg-[#1a1a1a] border border-white/10 hover:border-[#ff4e00]'}
                      `}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Moon className="w-4 h-4 opacity-20" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-8">
                {selectedCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-2"
                  >
                    <div className="w-24 h-40 bg-[#1a1a1a] border border-[#ff4e00] rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#ff4e00]" />
                    </div>
                    <p className="text-xs uppercase tracking-widest opacity-60">
                      {i === 0 ? 'Pasado' : i === 1 ? 'Presente' : 'Futuro'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'reading' && (
            <motion.div 
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-4xl space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {selectedCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                    className="group perspective"
                  >
                    <div className="relative w-full aspect-[2/3] transition-transform duration-700 transform-style-3d">
                      <div className="absolute inset-0 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                          <p className="text-xs uppercase tracking-widest text-[#ff4e00] mb-1">
                            {i === 0 ? 'Pasado' : i === 1 ? 'Presente' : 'Futuro'}
                          </p>
                          <h4 className="text-2xl font-light">{card.name}</h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff4e00] to-transparent opacity-50" />
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-6">
                    <div className="w-12 h-12 border-4 border-[#ff4e00]/20 border-t-[#ff4e00] rounded-full animate-spin" />
                    <p className="italic text-xl opacity-60">Canalizando la interpretación de los astros...</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert max-w-none prose-p:text-[#e0d8d0]/80 prose-headings:text-[#e0d8d0] prose-strong:text-[#ff4e00]"
                  >
                    <div className="markdown-body">
                      <Markdown>{interpretation || ''}</Markdown>
                    </div>
                  </motion.div>
                )}
              </div>

              {!isLoading && (
                <div className="flex justify-center">
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 px-12 py-4 border border-white/20 rounded-full uppercase tracking-widest hover:border-[#ff4e00] transition-all"
                  >
                    Nueva Consulta
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 p-8 text-center opacity-30 text-xs tracking-[0.2em] uppercase">
        © 2026 Tarot Arcano • Sabiduría Ancestral & IA
      </footer>

      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 78, 0, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 78, 0, 0.4); }
        
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          font-family: serif;
          font-style: italic;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
          color: #ff4e00;
        }
        .markdown-body p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          font-family: sans-serif;
          font-weight: 300;
        }
        .markdown-body ul {
          list-style-type: circle;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .markdown-body li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
