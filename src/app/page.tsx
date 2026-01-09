"use client";

import { useState } from "react";
import { Home, Calendar, TrendingUp, Sparkles, Plus, Award, Cookie } from "lucide-react";
import HomeScreen from "@/components/slingo/HomeScreen";
import HistoryScreen from "@/components/slingo/HistoryScreen";
import TrendScreen from "@/components/slingo/TrendScreen";
import SOSScreen from "@/components/slingo/SOSScreen";
import AddMealSheet from "@/components/slingo/AddMealSheet";
import WorkoutSheet from "@/components/slingo/WorkoutSheet";
import { useWorkoutStorage } from "@/lib/hooks/useWorkoutStorage";
import { Workout } from "@/lib/types/meal";

type Screen = "home" | "history" | "trend" | "sos";

export default function SlingoApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isWorkoutOpen, setIsWorkoutOpen] = useState(false);
  const [showWorkoutFeedback, setShowWorkoutFeedback] = useState(false);
  const { addWorkout } = useWorkoutStorage();

  const handleWorkoutRegister = (workoutData: {
    type: Workout["type"];
    sportName?: string;
    intensity: Workout["intensity"];
    duration: number;
    caloriesBurned: number;
  }) => {
    const workout: Workout = {
      id: Date.now().toString(),
      type: workoutData.type,
      sportName: workoutData.sportName,
      intensity: workoutData.intensity,
      duration: workoutData.duration,
      caloriesBurned: workoutData.caloriesBurned,
      timestamp: new Date(),
    };

    addWorkout(workout);
    setIsWorkoutOpen(false);
    
    // Mostrar feedback discreto
    setShowWorkoutFeedback(true);
    setTimeout(() => {
      setShowWorkoutFeedback(false);
      window.location.reload(); // Atualizar a tela
    }, 2000);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return (
          <HomeScreen
            onAddMeal={() => setIsAddMealOpen(true)}
            onAddWorkout={() => setIsWorkoutOpen(true)}
          />
        );
      case "history":
        return <HistoryScreen />;
      case "trend":
        return <TrendScreen />;
      case "sos":
        return <SOSScreen />;
      default:
        return (
          <HomeScreen
            onAddMeal={() => setIsAddMealOpen(true)}
            onAddWorkout={() => setIsWorkoutOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-inter font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Slingo
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">0 dias</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {renderScreen()}
      </main>

      {/* Workout Feedback Toast */}
      {showWorkoutFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-2xl">
            <p className="text-sm font-medium">Treino registrado. Ajustei o seu dia.</p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddMealOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-slate-200/60 px-4 py-3 z-40">
        <div className="flex items-center justify-around">
          <NavButton
            icon={Home}
            label="Início"
            active={activeScreen === "home"}
            onClick={() => setActiveScreen("home")}
          />
          <NavButton
            icon={Calendar}
            label="Histórico"
            active={activeScreen === "history"}
            onClick={() => setActiveScreen("history")}
          />
          <NavButton
            icon={TrendingUp}
            label="Bússola"
            active={activeScreen === "trend"}
            onClick={() => setActiveScreen("trend")}
          />
          <NavButton
            icon={Cookie}
            label="SOS Doce"
            active={activeScreen === "sos"}
            onClick={() => setActiveScreen("sos")}
          />
        </div>
      </nav>

      {/* Add Meal Bottom Sheet */}
      <AddMealSheet isOpen={isAddMealOpen} onClose={() => setIsAddMealOpen(false)} />

      {/* Workout Bottom Sheet */}
      <WorkoutSheet
        isOpen={isWorkoutOpen}
        onClose={() => setIsWorkoutOpen(false)}
        onRegister={handleWorkoutRegister}
      />
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? "scale-110" : ""} transition-transform duration-300`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
