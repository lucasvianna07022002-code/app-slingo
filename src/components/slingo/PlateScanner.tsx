"use client";

import { useState, useRef } from "react";
import { Camera, Check, Loader2, Edit2, Plus, Minus } from "lucide-react";
import { PlateAnalysisResult, NutritionInfo } from "@/lib/types/meal";

interface PlateScannerProps {
  onResult: (result: PlateAnalysisResult) => void;
  onBack: () => void;
}

export default function PlateScanner({ onResult, onBack }: PlateScannerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PlateAnalysisResult | null>(null);
  const [editedFoods, setEditedFoods] = useState<PlateAnalysisResult["foods"]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);

    // Simular análise de IA (em produção, usar OpenAI Vision API)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Resultado simulado
    const mockResult: PlateAnalysisResult = {
      foods: [
        {
          name: "Arroz Branco",
          estimatedPortion: "2 colheres de sopa",
          nutrition: { calories: 130, carbs: 28, protein: 2.7, fat: 0.3 },
          confidence: 0.92,
        },
        {
          name: "Feijão Preto",
          estimatedPortion: "1 concha",
          nutrition: { calories: 127, carbs: 23, protein: 9, fat: 0.5 },
          confidence: 0.88,
        },
        {
          name: "Frango Grelhado",
          estimatedPortion: "150g",
          nutrition: { calories: 248, carbs: 0, protein: 46, fat: 5.4 },
          confidence: 0.95,
        },
        {
          name: "Salada Verde",
          estimatedPortion: "1 porção",
          nutrition: { calories: 25, carbs: 5, protein: 2, fat: 0.3 },
          confidence: 0.85,
        },
      ],
      totalNutrition: {
        calories: 530,
        carbs: 56,
        protein: 59.7,
        fat: 6.5,
      },
    };

    setAnalysisResult(mockResult);
    setEditedFoods(mockResult.foods);
    setIsAnalyzing(false);
  };

  const handleAdjustPortion = (index: number, adjustment: number) => {
    const newFoods = [...editedFoods];
    const food = newFoods[index];

    // Ajustar em 25% para cima ou para baixo
    const multiplier = adjustment > 0 ? 1.25 : 0.75;

    newFoods[index] = {
      ...food,
      nutrition: {
        calories: Math.round(food.nutrition.calories * multiplier),
        carbs: Math.round(food.nutrition.carbs * multiplier),
        protein: Math.round(food.nutrition.protein * multiplier),
        fat: Math.round(food.nutrition.fat * multiplier),
      },
    };

    setEditedFoods(newFoods);
  };

  const calculateTotals = (): NutritionInfo => {
    return editedFoods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.nutrition.calories,
        carbs: acc.carbs + food.nutrition.carbs,
        protein: acc.protein + food.nutrition.protein,
        fat: acc.fat + food.nutrition.fat,
      }),
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );
  };

  const handleConfirm = () => {
    if (analysisResult) {
      onResult({
        ...analysisResult,
        foods: editedFoods,
        totalNutrition: calculateTotals(),
      });
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Camera Preview */}
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center">
        {!analysisResult ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" />
            <Camera className="w-16 h-16 text-white/50" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  <p className="text-sm font-medium text-slate-700">Analisando prato...</p>
                  <p className="text-xs text-slate-500">Identificando alimentos</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Check className="w-16 h-16 mx-auto mb-3" />
              <p className="text-lg font-semibold">Análise Completa!</p>
              <p className="text-sm opacity-90">{editedFoods.length} alimentos identificados</p>
            </div>
          </div>
        )}
      </div>

      {!analysisResult ? (
        <>
          <p className="text-center text-sm text-slate-600">
            Tire uma foto do seu prato para análise automática
          </p>
          <button
            onClick={handleCapture}
            disabled={isAnalyzing}
            className="w-full py-3 rounded-2xl bg-purple-500 text-white font-semibold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                Tirar Foto do Prato
              </>
            )}
          </button>
        </>
      ) : (
        <>
          {/* Foods List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700">Alimentos Identificados</h4>
              <span className="text-xs text-slate-500">Ajuste as porções se necessário</span>
            </div>

            {editedFoods.map((food, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-800">{food.name}</h5>
                    <p className="text-sm text-slate-500">{food.estimatedPortion}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            food.confidence > 0.9
                              ? "bg-green-500"
                              : food.confidence > 0.8
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                          }`}
                        />
                        <span className="text-xs text-slate-500">
                          {Math.round(food.confidence * 100)}% confiança
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAdjustPortion(index, -1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      onClick={() => handleAdjustPortion(index, 1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Cal</p>
                    <p className="text-sm font-bold text-slate-800">{food.nutrition.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Carbs</p>
                    <p className="text-sm font-bold text-slate-800">{food.nutrition.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Prot</p>
                    <p className="text-sm font-bold text-slate-800">{food.nutrition.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">Gord</p>
                    <p className="text-sm font-bold text-slate-800">{food.nutrition.fat}g</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Nutrition */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4">
            <h4 className="font-semibold text-purple-900 mb-3">Total da Refeição</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/80 rounded-xl p-3">
                <p className="text-xs text-purple-600 mb-1">Calorias</p>
                <p className="text-2xl font-bold text-purple-900">{calculateTotals().calories}</p>
                <p className="text-xs text-purple-600">kcal</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3">
                <p className="text-xs text-purple-600 mb-1">Carboidratos</p>
                <p className="text-2xl font-bold text-purple-900">{calculateTotals().carbs}</p>
                <p className="text-xs text-purple-600">gramas</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3">
                <p className="text-xs text-purple-600 mb-1">Proteínas</p>
                <p className="text-2xl font-bold text-purple-900">{calculateTotals().protein}</p>
                <p className="text-xs text-purple-600">gramas</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3">
                <p className="text-xs text-purple-600 mb-1">Gorduras</p>
                <p className="text-2xl font-bold text-purple-900">{calculateTotals().fat}</p>
                <p className="text-xs text-purple-600">gramas</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm text-amber-700">
              💡 <span className="font-semibold">Dica:</span> Use os botões + e - para ajustar as
              porções estimadas antes de confirmar.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setAnalysisResult(null);
                setEditedFoods([]);
              }}
              className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              Nova Foto
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Confirmar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
